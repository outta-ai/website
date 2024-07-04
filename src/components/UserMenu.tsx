"use client";

import { getUserInfo } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function UserMenu() {
	const { isPending, data } = useQuery({
		queryKey: ["me"],
		queryFn: () => getUserInfo({ refresh: true }),
	});

	if (isPending) {
		return <p className="text-gray-400">로딩 중...</p>;
	}

	if (!data) {
		return <Link href="/auth/login">로그인</Link>;
	}

	console.log(data);

	return (
		<div className="relative">
			<Link href="/auth/logout">
				<span className="font-semibold">{data.name}</span>님 안녕하세요
			</Link>
		</div>
	);
}
