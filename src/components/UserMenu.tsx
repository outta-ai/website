"use client";

import { getUserInfo } from "@/lib/user";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
	className?: string;
};

export function UserMenu({ className }: Props) {
	const { isLoading, data } = useQuery({
		queryKey: ["me"],
		queryFn: () => getUserInfo({ refresh: true }),
	});

	if (isLoading) {
		return <p className="text-gray-400">로딩 중...</p>;
	}

	if (!data) {
		return <Link href="/auth/login">로그인</Link>;
	}

	return (
		<div className="w-full h-6 relative font-pretendard">
			<div className="absolute top-0 right-0 overflow-hidden h-6 hover:h-64 transition-all duration-200 z-20">
				<div className="h-6">
					<span className="font-semibold">{data.name}</span>님 안녕하세요
					<FontAwesomeIcon icon={faChevronDown} className="mx-2" />
				</div>
				<ul className="w-full text-left bg-white/75">
					<li className="w-full border border-gray-300 p-2">
						<Link href="/members/mypage" className="block w-full">
							마이페이지
						</Link>
					</li>
					<li className="w-full border border-gray-300 p-2">
						<Link href="/auth/logout" className="block w-full">
							로그아웃
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
