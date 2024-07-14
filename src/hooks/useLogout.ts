import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useLogout() {
	const queryClient = useQueryClient();

	const logout = useCallback(async () => {
		const token = crypto.randomUUID();
		await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/outta/auth/logout?token=${token}`,
			{
				method: "POST",
				headers: {
					"X-OUTTA-TOKEN": token,
				},
				credentials: "include",
			},
		);

		queryClient.invalidateQueries();
	}, [queryClient]);

	return logout;
}
