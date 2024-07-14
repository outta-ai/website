import { z } from "zod";
import { refreshToken } from "./auth";

const MeResponse = z.object({
	result: z.literal(true),
	data: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.passthrough(),
});

export async function getUserInfo(options?: { refresh?: boolean }) {
	const response = await (() => {
		try {
			return fetch(`${process.env.NEXT_PUBLIC_API_URL}/outta/user/me`, {
				credentials: "include",
			});
		} catch (error) {
			console.error("[User - Me] fetch:", error);
			return null;
		}
	})();

	// fetch only throws on network errors
	if (!response) {
		return null;
	}

	const result = await response.text();
	if (response.status === 200) {
		try {
			const data = MeResponse.parse(JSON.parse(result));
			return data.data;
		} catch {
			// We have access token but something is wrong
			// We do not retry
			return null;
		}
	}

	if (response.status === 401) {
		// No access token
		if (options?.refresh) {
			await refreshToken();
			return getUserInfo({ refresh: false });
		}
		return null;
	}

	return null;
}
