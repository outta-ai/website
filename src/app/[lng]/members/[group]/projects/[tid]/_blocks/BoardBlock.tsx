import { useMemo, useState } from "react";

import type { BoardBlock as BoardBlockType } from "@payload/types";

import { useQuery } from "@tanstack/react-query";
import { generateText } from "@tiptap/core";

import {
	extensions,
	TiptapEditor,
} from "@/components/TiptapEditor/TiptapEditor";
import { shortDate } from "@/lib/date";
import { getID, getPayloadAll, getPayloadOne } from "@/lib/payload";
import classNames from "classnames";

type Props = {
	block: BoardBlockType;
	baseUrl: string;
	className?: string;
};

export function BoardBlock({ block, baseUrl, className }: Props) {
	const [page, setPage] = useState(1);

	const { data: boardResponse, isLoading: isBoardLoading } = useQuery({
		queryKey: ["board", block.board],
		queryFn: () => getPayloadOne("boards", getID(block.board)),
		enabled: typeof block.board === "string",
	});

	const board = typeof block.board === "object" ? block.board : boardResponse;

	const { data: posts, isLoading: isPostsLoading } = useQuery({
		queryKey: ["board", block.board, "posts", page],
		queryFn: () =>
			getPayloadAll(
				"posts",
				{ board: { equals: getID(block.board) } },
				new URLSearchParams({ limit: "10", page: page.toString() }),
			),
	});

	const description = useMemo(
		() =>
			board?.description?.[0] &&
			generateText(board.description[0], extensions(true)),
		[board],
	);

	if (isBoardLoading || isPostsLoading) {
		return <p>게시판 로딩중...</p>;
	}

	if (!board) {
		return null;
	}

	return (
		<div className={classNames("mt-24", className)}>
			<h3 className="font-semibold text-2xl">{board.title}</h3>
			<div className="w-full flex justify-center">
				{description && (
					<TiptapEditor
						className="w-full"
						content={board.description?.[0]}
						readOnly
					/>
				)}
			</div>
			{!posts && (
				<p className="text-center text-gray-300">
					게시글을 불러오는 데 실패했습니다
				</p>
			)}
			{posts && (
				<table className="w-full table-fixed">
					<colgroup>
						<col />
						<col className="w-16 sm:w-24" />
						<col className="w-16 sm:w-24" />
					</colgroup>
					<thead className="border-b border-gray-300">
						<tr className="">
							<th className="w-full">
								<p className="py-2">제목</p>
							</th>
							<th className="w-full">
								<p className="py-2">작성자</p>
							</th>
							<th className="w-full">
								<p className="py-2">작성 일자</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{posts.docs.map((post) => (
							<tr key={post.id} className="border-t border-gray-300">
								<td className="w-full">
									<a
										className="block py-2 overflow-hidden text-ellipsis text-nowrap"
										href={`${baseUrl}/posts/${post.id}`}
									>
										{post.title}
									</a>
								</td>
								<td className="w-full text-center">
									<a
										className="block py-2"
										href={`${baseUrl}/posts/${post.id}`}
									>
										{typeof post.author === "object" ? post.author.name : ""}
									</a>
								</td>
								<td className="w-full text-center">
									<a
										className="block py-2"
										href={`${baseUrl}/posts/${post.id}`}
									>
										{shortDate(new Date(post.createdAt))}
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
