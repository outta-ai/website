import { redirect } from "next/navigation";

import {
	DecryptError,
	InvalidAuthTagLengthError,
	InvalidCookieFormatError,
	InvalidIVLengthError,
	InvalidKeyLengthError,
	NoCookieError,
	NoKeyError,
	getEncryptedCookie,
} from "@/utils/cookies";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";
import { google } from "./_providers/google";

export const AuthResponse = z.union([
	z.object({
		result: z.literal(true),
		token: z.object({
			access_token: z.string(),
			refresh_token: z.string(),
		}),
	}),
	z.object({
		result: z.literal(false),
		error: z.string(),
	}),
]);

export async function GET(req: Request, _res: Response) {
	const url = new URL(req.url);
	const provider = url.pathname.split("/").pop();

	const verifier = await (async () => {
		try {
			return await getEncryptedCookie(
				"OUTTA_OAUTH_CODE_VERIFIER",
				process.env.OAUTH_SERVER_SECRET,
			);
		} catch (error) {
			if (isRedirectError(error)) {
				throw error;
			}

			if (error instanceof NoKeyError) {
				console.error("[AUTH - Callback] NoKeyError:", error);
				redirect("/auth/login?error=misconfigured_oauth");
			}

			if (error instanceof InvalidKeyLengthError) {
				console.error("[AUTH - Callback] InvalidKeyLengthError:", error);
				redirect("/auth/login?error=misconfigured_oauth");
			}

			if (error instanceof NoCookieError) {
				redirect("/auth/login?error=no_verifier");
			}

			if (error instanceof InvalidCookieFormatError) {
				console.error("[AUTH - Callback] InvalidCookieFormatError:", error);
				redirect("/auth/login?error=bad_request");
			}

			if (error instanceof InvalidAuthTagLengthError) {
				console.error("[AUTH - Callback] InvalidAuthTagLengthError:", error);
				redirect("/auth/login?error=bad_request");
			}

			if (error instanceof InvalidIVLengthError) {
				console.error("[AUTH - Callback] InvalidIVLengthError:", error);
				redirect("/auth/login?error=bad_request");
			}

			if (error instanceof DecryptError) {
				console.error("[AUTH - Callback] DecryptError:", error);
				redirect("/auth/login?error=bad_request");
			}

			redirect("/auth/login?error=unknown_error");
		}
	})();

	if (provider === "google") {
		return google(url, verifier);
	}

	redirect("/auth/login?error=invalid_provider");
}
