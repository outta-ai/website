export async function refreshToken() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/outta/auth/refresh`,
		{
			credentials: "include",
		},
	);

	return response.status === 200;
}
