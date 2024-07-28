import { Suspense, useMemo } from "react";

import type { BoardBlock as BoardBlockType } from "@payload/types";

import { generateText } from "@tiptap/core";

import { Pagination } from "@/components/Pagination";
import {
	extensions,
	TiptapEditor,
} from "@/components/TiptapEditor/TiptapEditor";
import { useBoard, usePosts } from "@/hooks/payload";
import { shortDate } from "@/lib/date";
import { mergeQuery } from "@/lib/payload";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

type Props = {
	group: string;
	tid: string;
	block: BoardBlockType;
	baseUrl: string;
	className?: string;
};

function BoardBlockContent({ group, tid, block, baseUrl, className }: Props) {
	const searchParams = useSearchParams();

	const page = useMemo(() => {
		const param = searchParams.get("page");
		if (!param) {
			return 1;
		}

		const parsed = Number.parseInt(param);
		if (Number.isNaN(parsed)) {
			return 1;
		}

		return parsed;
	}, [searchParams]);

	const { data: boardResponse, isLoading: isBoardLoading } = useBoard(
		block.board,
	);
	const board = mergeQuery(block.board, boardResponse);

	const {
		data: posts,
		isLoading: isPostsLoading,
		error,
	} = usePosts(board, page);

	console.error(error);

	const description = useMemo(
		() =>
			board?.description?.[0] &&
			generateText(board.description[0], extensions(true)),
		[board],
	);

	if (isBoardLoading || isPostsLoading) {
		console.log(isBoardLoading, isPostsLoading);
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
				<>
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
					<div className="flex justify-between mb-12 mt-6">
						<div />
						<Pagination totalPages={posts.totalPages} count={10} />
						<a
							href={`/members/${group}/projects/${tid}/posts/new?board=${board?.id}`}
							className="block font-semibold border border-gray-300 px-4 py-1"
						>
							글쓰기
						</a>
					</div>
				</>
			)}
		</div>
	);
}

export function BoardBlock(props: Props) {
	return (
		<Suspense>
			<BoardBlockContent {...props} />
		</Suspense>
	);
}
