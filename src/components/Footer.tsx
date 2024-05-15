import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Info } from "@payload/types";

export async function Footer() {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/globals/info`,
		{
			cache: "default",
		},
	);

	const dataRaw = await request.json();
	const data = dataRaw as Info;

	return (
		<div className="w-full h-[30vh] flex flex-col sm:flex-row font-pretendard bg-black text-white/75 p-6 sm:p-16">
			<div className="flex-1">
				<ul className="last:border-none">
					{data.bottom?.map((item) => (
						<li
							key={item.id}
							className="inline px-3 border-r border-white/75 first:pl-0 last:border-none"
						>
							<a href={item.url}>{item.name}</a>
						</li>
					))}
				</ul>
				<div className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6">
					<p className="inline col-span-2 font-bold">{data.name}</p>
					<p className="inline font-semibold">주소</p>
					<p>{data.address}</p>
					<p className="inline font-semibold">고유번호</p>
					<p>{data.registrationNumber}</p>
					<p className="inline font-semibold">이메일</p>
					<p>{data.email}</p>
				</div>
				<div className="mt-6">
					<span className="font-semibold mr-6">소셜 미디어</span>
					{data.social?.map((item) => (
						<a href={item.url} key={item.id} className="mr-3">
							{item.name}
						</a>
					))}
				</div>
			</div>
			<div className="w-64">
				<p className="text-lg mb-3 font-bold">관련 사이트</p>
				{data.external?.map((item) => (
					<a
						key={item.id}
						href={item.url}
						className="flex items-center p-3 border border-white/75 mb-3"
					>
						<FontAwesomeIcon icon={faExternalLink} className="w-4 h-4 mr-2" />
						{item.name}
					</a>
				))}
			</div>
		</div>
	);
}
