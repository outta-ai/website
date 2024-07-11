"use client";

import Image from "next/image";

import logoGoogle from "@/assets/images/image_logo_google.png";
import { useRouter } from "next/navigation";

export function GoogleLoginButton() {
	const router = useRouter();

	const onClick = async () => {
		const request = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/outta/auth/google`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
				}),
				credentials: "include",
			},
		);
		const data = await request.json();
		if (!data?.result) {
			console.error(data);
			return;
		}

		router.push(data.data);
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full my-6 p-3 border rounded-lg shadow-lg"
		>
			<Image
				src={logoGoogle}
				width={24}
				height={24}
				alt="Google"
				className="inline mr-3"
			/>
			Google로 로그인
		</button>
	);
}
