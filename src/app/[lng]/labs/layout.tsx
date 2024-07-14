"use client";

import LogoLabs1 from "@/assets/icons/icon_logo_labs1.svg";
import LogoLabs2 from "@/assets/icons/icon_logo_labs2.svg";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import { IBM_Plex_Sans_KR } from "next/font/google";
import type { PropsWithChildren } from "react";

const ibmPlex = IBM_Plex_Sans_KR({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
});

export default function LabsLayout({ children }: PropsWithChildren) {
	const pathname = usePathname();

	return (
		<div className="w-full h-full font-pretendard">
			<div className="w-full min-h-[512px] bg-customgrad-main-0.5 overflow-auto">
				<div className="w-full max-w-[1024px] min-h-28 mt-64 mx-auto px-6 pb-12 lg:px-16">
					<div className="flex flex-col sm:flex-row gap-[9px]">
						<LogoLabs1 />
						<LogoLabs2 />
					</div>
					<p className="mt-6 font-semibold">
						OUTTA AI 연구소는 인공지능을 탐구하는 단체입니다. <br />
						우리는 모두의 일상에 인공지능이 자연히 녹아들 때까지 발걸음을 멈추지
						않을 것입니다.
					</p>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row justify-center items-center bg-white py-6 font-normal text-lg sm:gap-6">
				<a
					className={classNames(
						"block w-48 py-4 rounded-md text-center font-medium",
						ibmPlex.className,
						pathname === "/labs"
							? "text-identity-500 bg-zinc-200 hover:bg-zinc-300"
							: "text-black bg-white hover:bg-zinc-100",
					)}
					href="/labs"
				>
					AI 부트캠프
				</a>
				<a
					className={classNames(
						"block w-48 py-4 rounded-md text-center font-medium",
						ibmPlex.className,
						pathname.startsWith("/labs/materials")
							? "text-identity-500 bg-zinc-200 hover:bg-zinc-300"
							: "text-black bg-white hover:bg-zinc-100",
					)}
					href="/labs/materials"
				>
					교육자료
				</a>
				<a
					className={classNames(
						"block w-48 py-4 rounded-md text-center font-medium",
						ibmPlex.className,
						pathname.startsWith("/labs/board")
							? "text-identity-500 bg-zinc-200 hover:bg-zinc-300"
							: "text-black bg-white hover:bg-zinc-100",
					)}
					href="/labs/board"
				>
					게시판
				</a>
				<a
					className={classNames(
						"block w-48 py-4 rounded-md text-center font-medium",
						ibmPlex.className,
						pathname.startsWith("/labs/members")
							? "text-identity-500 bg-zinc-200 hover:bg-zinc-300"
							: "text-black bg-white hover:bg-zinc-100",
					)}
					href="/labs/members"
				>
					멤버 소개
				</a>
			</div>
			{children}
		</div>
	);
}
