"use server";

import crypto from "node:crypto";

import {
	EncryptError,
	InvalidKeyLengthError,
	NoKeyError,
	toEncryptedCookie,
} from "@/utils/cookies";
import { cookies } from "next/headers";
import { AuthResponse } from "../callback/[provider]/route";

export async function getOAuthState() {
	const state = crypto.randomUUID();
	const code_verifier = crypto.randomBytes(64).toString("hex");
	const code_challenge = crypto
		.createHash("sha256")
		.update(code_verifier)
		.digest()
		.toString("base64url");

	const verifier = await (() => {
		try {
			return toEncryptedCookie(code_verifier, process.env.OAUTH_SERVER_SECRET);
		} catch (e) {
			if (e instanceof NoKeyError) {
				console.error("[AUTH - OAuth] NoKeyError:", e);
				return null;
			}

			if (e instanceof InvalidKeyLengthError) {
				console.error("[AUTH - OAuth] InvalidKeyLengthError:", e);
				return null;
			}

			if (e instanceof EncryptError) {
				console.error("[AUTH - OAuth] EncryptError:", e);
				return null;
			}

			console.error("[AUTH - OAuth] Unknown Error:", e);
			throw e;
		}
	})();

	if (!verifier) {
		throw new Error("Failed to create OAuth parameters");
	}

	cookies().set("OUTTA_OAUTH_STATE", state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	cookies().set("OUTTA_OAUTH_CODE_VERIFIER", verifier, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});

	return { state, code_challenge };
}

export async function refreshToken() {
	const refreshToken = cookies().get("OUTTA_REFRESH_TOKEN");
	if (!refreshToken?.value) {
		throw new Error("No refresh token found");
	}

	const response = await (function sendRefreshRequest() {
		try {
			return fetch(`${process.env.PAYLOAD_CMS_URL}/api/outta/refresh`, {
				method: "POST",
				headers: {
					Authorization: refreshToken.value,
				},
			});
		} catch (error) {
			console.error("[AUTH - Refresh] fetch:", error);
			throw error;
		}
	})();

	const { access_token, refresh_token } = await (async function getNewTokens() {
		try {
			const dataRaw = await response.json();
			const data = AuthResponse.safeParse(dataRaw);

			if (!data.success) {
				console.error("[AUTH - Refresh] AuthResponse ParseError:", dataRaw);
				console.error("[AUTH - Refresh] AuthResponse ParseError:", data.error);
				throw new Error("Failed to parse response");
			}

			if (!data.data.result) {
				throw new Error(data.data.error);
			}

			return data.data.token;
		} catch (error) {
			console.error("[AUTH - Refresh] response.json:", error);
			throw error;
		}
	})();

	cookies().set("OUTTA_ACCESS_TOKEN", access_token, {
		secure: process.env.NODE_ENV === "production",
		expires: new Date(Date.now() + 1000 * 60 * 60),
	});

	cookies().set("OUTTA_REFRESH_TOKEN", refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
	});
}
