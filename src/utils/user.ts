"use server";

import { cookies } from "next/headers";

import { refreshToken } from "@/app/auth/login/actions";
import { Member } from "@payload/types";
import { decodeJwt } from "jose";
import { z } from "zod";

export async function getAccessToken(options?: {
	refresh?: boolean;
	format?: "string" | "parsed";
}) {
	const accessToken = cookies().get("OUTTA_ACCESS_TOKEN");
	if (accessToken?.value) {
		const token = decodeJwt(accessToken.value);
		if (token.exp && token.exp > Date.now() / 1000) {
			return options?.format === "string" ? accessToken.value : token;
		}

		if (!options?.refresh) {
			return null;
		}

		try {
			await refreshToken();
		} catch (error) {
			return null;
		}
	} else {
		if (!options?.refresh) {
			return null;
		}

		try {
			await refreshToken();
		} catch (error) {
			console.error("Refresh Failed:", error);
			return null;
		}
	}
}

const GetUserInfoResponse = z.union([
	z.object({
		result: z.literal(true),
		data: z.any(),
	}),
	z.object({
		result: z.literal(false),
		error: z.string(),
	}),
]);

export async function getUserInfo(options?: { refresh?: boolean }) {
	const accessToken = await getAccessToken({ ...options, format: "string" });
	if (!accessToken) {
		return null;
	}

	const response = await (function fetchUserInfo() {
		try {
			return fetch(`${process.env.PAYLOAD_CMS_URL}/api/outta/me`, {
				headers: {
					Authorization: accessToken as string,
				},
			});
		} catch (error) {
			console.error("[AUTH - Me] fetch:", error);
			return null;
		}
	})();

	if (!response) {
		return null;
	}

	const dataText = await response.text();

	console.log(dataText);

	try {
		const data = GetUserInfoResponse.safeParse(JSON.parse(dataText));
		if (!data.success) {
			console.error("[AUTH - Me] unparsable response:", data);
			console.error("[AUTH - Me] unparsable response:", data.error);
			return null;
		}

		if (!data.data.result) {
			console.error("[AUTH - Me] response error:", data.data.error);
			return null;
		}

		console.log(data.data);
		return data.data.data as Member;
	} catch (error) {
		console.error("[AUTH - Me] unparsable response:", dataText);
		console.error("[AUTH - Me] response.json:", error);
		return null;
	}
}
