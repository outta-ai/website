"use client";

import Image from "next/image";

import logoGoogle from "@/assets/images/image_logo_google.png";
import { getOAuthState } from "../actions";

export function GoogleLoginButton() {
	if (!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID) {
		return null;
	}

	const googleLoginUrl = new URL(
		"https://accounts.google.com/o/oauth2/v2/auth",
	);
	googleLoginUrl.searchParams.append(
		"client_id",
		process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
	);
	googleLoginUrl.searchParams.append(
		"redirect_uri",
		`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/google`,
	);
	googleLoginUrl.searchParams.append("response_type", "code");
	googleLoginUrl.searchParams.append("scope", "openid email profile");
	googleLoginUrl.searchParams.append("code_challenge_method", "S256");
	const onClick = async () => {
		const { state, code_challenge } = await getOAuthState();
		googleLoginUrl.searchParams.append("state", `${state}-google`);
		googleLoginUrl.searchParams.append("code_challenge", code_challenge);
		window.location.href = googleLoginUrl.toString();
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
