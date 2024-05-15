import Image from "next/image";
import Link from "next/link";

import logoGoogle from "@/assets/images/image_logo_google.png";

export default function LoginPage() {
	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center sm:p-3">
			<div className="max-w-sm w-full">
				<h2 className="text-4xl text-center font-bold">Login</h2>
				<button
					type="button"
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
				<div className="w-full flex justify-center">
					<Link href="/auth/register" className="text-center">
						회원가입
					</Link>
				</div>
			</div>
		</div>
	);
}
