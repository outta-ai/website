import Image from "next/image";

import IconBookOpen from "@/assets/icons/icon_book_open.svg";
import { RichText, StyledText } from "@/components/RichText";
import { getImage } from "@/utils/image";
import { WebsiteLab } from "@payload/types";
import classNames from "classnames";
import { IBM_Plex_Sans_KR } from "next/font/google";

const ibmPlex = IBM_Plex_Sans_KR({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
});

export default async function LabsMaterialsPage() {
	const request = await fetch(
		`${process.env.PAYLOAD_CMS_URL}/api/globals/website-lab`,
		{
			next: {
				revalidate: 5 * 60,
				tags: ["payload"],
			},
		},
	);

	const dataRaw = await request.json();
	const data = (dataRaw as WebsiteLab).materials;

	if (!data) {
		return null;
	}

	return (
		<div className="w-full max-w-[1024px] mx-auto lg:px-16 py-12">
			{data.map((m) => (
				<div key={m.id} className="relative">
					<Image
						width={240}
						height={320}
						src={getImage(m.image)}
						alt="book"
						className="absolute bottom-0 left-0 w-[240px] h-full object-contain object-left"
					/>
					<div className="flex items-center ml-[240px]">
						<IconBookOpen className="w-8 h-8" />
						<p className="ml-2 font-bold text-2xl">{m.title}</p>
					</div>
					<RichText className="bg-zinc-100 w-full p-7 pl-[240px] rounded-2xl leading-snug mt-2">
						{m.description as StyledText}
					</RichText>
					<div className="bg-zinc-100 w-full pl-[240px] rounded-2xl leading-snug mt-2 py-2 flex items-center pr-6">
						<p
							className={classNames(
								"text-[rgba(63,64,72,0.70)]",
								ibmPlex.className,
							)}
						>
							{m.year} • {m.publisher}
						</p>
						<div className="flex-1" />
						<p className="mr-6">정가 {m.price.toLocaleString("en-US")}원</p>
						{m.link ? (
							<a
								href={m.link}
								className="py-1 px-2 w-16 bg-identity-200 text-identity-800 text-base leading-normal font-semibold rounded-lg text-center"
							>
								구매하기
							</a>
						) : (
							<p className="py-1 px-2 w-16 bg-zinc-200 text-zinc-800 text-base leading-normal font-semibold rounded-lg text-center">
								품절
							</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
