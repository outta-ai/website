export default function RegisterPage() {
	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center sm:p-3">
			<div className="max-w-lg w-full break-keep">
				<h2 className="text-4xl text-center font-bold">Register</h2>
				<p className="mt-3 text-center">
					OUTTA 계정은 <span className="font-semibold">OUTTA 부원</span> 또는{" "}
					<span className="font-semibold">OUTTA 부트캠프 수강생</span>에게만
					제공됩니다.
				</p>
				<p className="mt-3 text-center">
					계정을 발급받은 적이 없거나 분실하신 경우{" "}
					<a href="mailto:member_support@outta.ai" className="text-indigo-600">
						OUTTA 회원 문의
					</a>
					로
				</p>
				<p className="text-center">
					성함, 구글 이메일, 활동 시기를 보내 주세요.
				</p>
			</div>
		</div>
	);
}
