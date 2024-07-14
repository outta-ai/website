import { refreshToken } from "@/lib/auth";
import { z } from "zod";

export const ProjectsResponse = z.object({
	result: z.literal(true),
	data: z.array(
		z
			.object({
				id: z.string(),
				name: z.string(),
				category: z.string(),
				link: z.string().optional(),
				admin: z.boolean(),
			})
			.passthrough(),
	),
});

export async function getUserProjects(options?: { refresh?: boolean }) {
	const response = await (() => {
		try {
			return fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/outta/user/me/projects`,
				{
					credentials: "include",
				},
			);
		} catch (error) {
			console.error("[User - projects] fetch:", error);
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
			const data = ProjectsResponse.parse(JSON.parse(result));
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
			return getUserProjects({ refresh: false });
		}
		return null;
	}

	return null;
}
