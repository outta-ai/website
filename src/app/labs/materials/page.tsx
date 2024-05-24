import Image from "next/image";

import IconBookOpen from "@/assets/icons/icon_book_open.svg";
import imageBook from "@/assets/images/image_book.png";
import classNames from "classnames";
import { IBM_Plex_Sans_KR } from "next/font/google";

const ibmPlex = IBM_Plex_Sans_KR({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "latin-ext"],
});

export default function LabsMaterials() {
	return (
		<div>
			<div className="w-full max-w-[1024px] mx-auto lg:px-16 py-12">
				<div className="relative">
					<Image
						src={imageBook}
						alt="book"
						className="rounded-lg shadow-lg absolute bottom-0 left-0"
					/>
					<div className="flex items-center ml-[240px]">
						<IconBookOpen className="w-8 h-8" />
						<p className="ml-2 font-bold text-2xl">머신러닝 첫 단추 끼우기</p>
					</div>
					<p className="bg-zinc-100 w-full p-7 pl-[240px] rounded-2xl leading-snug mt-2">
						대학 수학을 배우지 않았더라도, 고등학교 수학을 잘 배운 사람이라면
						누구나 읽을 수 있도록 쓰여진 교재다. 2015년 개정 고등학교 수학
						교육과정(미적분, 기하, 확률과 통계)에 해당하는 수학 지식을 가지고
						있는 사람이 읽기 적당하다. 수록된 모든 프로그래밍 실습은 Python을
						기반으로 한다. 실습은 친절한 주석과 부연 설명으로 이루어져 있으므로,
						Python에 능숙하지 않더라도 천천히 자신의 속도에 맞게 따라가며 학습할
						수 있다.
					</p>
					<div className="bg-zinc-100 w-full pl-[240px] rounded-2xl leading-snug mt-2 py-2 flex items-center pr-6">
						<p
							className={classNames(
								"text-[rgba(63,64,72,0.70)]",
								ibmPlex.className,
							)}
						>
							2022 • 홍릉과학출판사
						</p>
						<div className="flex-1" />
						<p className="mr-6">정가 20,000원</p>
						<a className="p-2 bg-identity-200 text-identity-800 text-lg leading-normal font-semibold rounded-lg">
							구매하기
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
