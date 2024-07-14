import Link from "next/link";

import { GoogleLoginButton } from "./_components/GoogleLoginButton";

export default function LoginPage() {
	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center sm:p-3">
			<div className="max-w-sm w-full">
				<h2 className="text-4xl text-center font-bold">Login</h2>
				<GoogleLoginButton />
				<div className="w-full flex justify-center">
					<Link href="/auth/register" className="text-center">
						회원가입
					</Link>
				</div>
			</div>
		</div>
	);
}
