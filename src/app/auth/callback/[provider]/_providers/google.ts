import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SignJWT } from "jose";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";
import { AuthResponse } from "../route";

const GoogleTokenResponse = z.object({
	access_token: z.string(),
	expires_in: z.number(),
	token_type: z.string(),
	scope: z.string(),
	refersh_token: z.string().optional(),
});

export async function google(url: URL, verifier: string) {
	if (
		!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ||
		!process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
		!process.env.TOKEN_SECRET
	) {
		redirect("/auth/login?provider=google&error=misconfigured_oauth");
	}

	const state = cookies().get("OUTTA_OAUTH_STATE");
	if (!state?.value) {
		redirect("/auth/login?provider=google&error=no_state");
	}

	const error = url.searchParams.get("error");
	if (error) {
		redirect(`/auth/login?provider=google&error=${error}`);
	}

	if (`${state.value}-google` !== url.searchParams.get("state")) {
		redirect("/auth/login?provider=google&error=invalid_state");
	}

	const code = url.searchParams.get("code");
	if (!code) {
		redirect("/auth/login?provider=google&error=no_code");
	}

	const params = new URLSearchParams();
	params.append("code", code);
	params.append("client_id", process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID);
	params.append("client_secret", process.env.GOOGLE_OAUTH_CLIENT_SECRET);
	params.append(
		"redirect_uri",
		`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/google`,
	);
	params.append("grant_type", "authorization_code");
	params.append("code_verifier", verifier);

	const token_response = await (function getGoogleTokenResponse() {
		try {
			return fetch("https://oauth2.googleapis.com/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: params,
			});
		} catch (error) {
			console.error("[AUTH - Google] fetch:", error);
			redirect("/auth/login?provider=google&error=server_error");
		}
	})();

	const token_data = await (function getTokenData() {
		try {
			return token_response.json();
		} catch (error) {
			console.error("[AUTH - Google] token_response.json:", error);
			redirect("/auth/login?provider=google&error=server_error");
		}
	})();

	const token = GoogleTokenResponse.safeParse(token_data);
	if (!token.success) {
		console.error(
			"[AUTH - Google] GoogleTokenResponse ParseError:",
			token_data,
		);
		console.error(
			"[AUTH - Google] GoogleTokenResponse ParseError:",
			token.error,
		);
		redirect("/auth/login?provider=google&error=server_error");
	}

	const key = Buffer.from(process.env.TOKEN_SECRET, "hex");
	const auth_token = await (function createAuthToken() {
		try {
			return new SignJWT({
				provider: "google",
				token: token.data.access_token,
			})
				.setAudience("api.outta.ai")
				.setIssuer("outta.ai/server")
				.setSubject("auth.user")
				.setExpirationTime("5m")
				.setProtectedHeader({ alg: "HS256" })
				.sign(key);
		} catch (error) {
			console.error("[AUTH - Google] SignJWT:", error);
			redirect("/auth/login?provider=google&error=server_error");
		}
	})();

	const response = await (function sendAuthRequest() {
		try {
			return fetch(`${process.env.PAYLOAD_CMS_URL}/api/outta/login`, {
				method: "POST",
				headers: {
					Authorization: auth_token,
				},
			});
		} catch (error) {
			console.error("[AUTH - Google] fetch:", error);
			redirect("/auth/login?provider=google&error=server_error");
		}
	})();

	try {
		const dataRaw = await response.json();
		const data = AuthResponse.safeParse(dataRaw);

		if (!data.success) {
			console.error("[AUTH - Google] AuthResponse ParseError:", dataRaw);
			console.error("[AUTH - Google] AuthResponse ParseError:", data.error);
			redirect("/auth/login?provider=google&error=server_error");
		}

		if (!data.data.result) {
			redirect(
				`/auth/login?provider=google&error=unauthorized&reason=${data.data.error}`,
			);
		}

		cookies().set("OUTTA_ACCESS_TOKEN", data.data.token.access_token, {
			secure: process.env.NODE_ENV === "production",
			expires: new Date(Date.now() + 1000 * 60 * 60),
		});

		cookies().set("OUTTA_REFRESH_TOKEN", data.data.token.refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		});

		redirect("/");
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}

		console.error("[AUTH - Google] response.json:", error);
		redirect("/auth/login?provider=google&error=server_error");
	}
}
