export default function RegisterPage() {
	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center sm:p-3">
			<div className="max-w-md w-full">
				<h2 className="text-4xl text-center font-bold">Register</h2>
				<p className="my-3 text-gray-500">
					OUTTA 계정은 OUTTA 부원 또는 OUTTA 부트캠프 수강생에게만 제공됩니다.
					OUTTA 부원이거나 OUTTA 부트캠프 수강생임에도 불구하고 계정에 접근하지
					못하고 있는 경우 다음 양식을 통하여 계정을 신청해 주세요
				</p>
				<form>
					<div className="mt-3">
						<p className="px-1">
							이름 <span className="text-red-500">*</span>
						</p>
						<input
							type="text"
							className="w-full p-2 rounded-md border"
							placeholder="이름"
						/>
					</div>
					<div className="mt-3">
						<p className="px-1">
							활동 타입 <span className="text-red-500">*</span>
						</p>
						<select className="w-full p-2 rounded-md border">
							<option>OUTTA 부원</option>
						</select>
					</div>
					<button
						type="submit"
						className="w-full my-6 p-2 border rounded-lg shadow-lg"
					>
						계정 신청
					</button>
				</form>
			</div>
		</div>
	);
}
