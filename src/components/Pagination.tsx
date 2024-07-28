"use client";

import { usePage } from "@/hooks/usePage";
import classNames from "classnames";

type Props =
	| {
			totalPages: number;
			count?: number;
	  }
	| {
			totalPosts: number;
			slice: number;
			count?: number;
	  };

export function Pagination(props: Props) {
	const count = props.count ?? 5;

	const totalPages = (() => {
		if ("totalPages" in props) {
			return props.totalPages;
		}
		return Math.ceil(props.totalPosts / props.slice);
	})();

	const [page, setPage] = usePage();

	return (
		<div className="flex">
			{Array(count)
				.fill(0)
				.map((_p, i) => page - Math.floor(count / 2) + i)
				.filter((p) => p > 0)
				.filter((p) => p <= totalPages)
				.map((p) => (
					<p
						key={p}
						onClick={() => setPage(p)}
						onKeyUp={() => setPage(p)}
						className={classNames(
							"flex justify-center items-center w-8 h-8 text-sm border border-gray-200",
							page === p ? "bg-gray-200 cursor-default" : "cursor-pointer",
						)}
					>
						{p}
					</p>
				))}
		</div>
	);
}
