"use client";

import { TiptapEditor } from "@/components/TiptapEditor/TiptapEditor";
import { useLanguage } from "@/hooks/useLanguages";
import { getID, getPayloadAll, getPayloadOne } from "@/lib/payload";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./_components/Comment";

type Props = {
	params: {
		group: string;
		tid: string;
		pid: string;
	};
};

export default function ProjectPostPage({
	params: { group, tid, pid },
}: Props) {
	const { isLoading: isProjectLoading, data: project } = useQuery({
		queryKey: ["project", tid],
		queryFn: async () => {
			if (/^[0-9a-fA-F]{24}$/.test(tid)) {
				return getPayloadOne("projects", tid);
			}

			const result = await getPayloadAll("projects", {
				link: { equals: tid },
				category: { equals: group },
			});

			if (result.totalDocs !== 1) {
				throw new Error("Project not found");
			}

			return result.docs[0];
		},
	});

	const { isLoading: isPostLoading, data: post } = useQuery({
		queryKey: ["post", pid],
		queryFn: () => getPayloadOne("posts", pid),
	});

	const { isLoading: isBoardLoading, data: boardQuery } = useQuery({
		queryKey: ["board", post ? getID(post.board) : ""],
		queryFn: () => getPayloadOne("boards", post ? getID(post.board) : ""),
		enabled: typeof post?.board === "string",
	});

	const board = typeof post?.board === "object" ? post.board : boardQuery;

	const language = useLanguage();
	const baseUrl = `/${language}/members/${group}/projects/${tid}`;

	if (isProjectLoading || isPostLoading || isBoardLoading) {
		return (
			<p className="text-center text-3xl text-gray-300">게시글 로딩중...</p>
		);
	}

	if (!project || !board || !post) {
		return (
			<p className="text-center text-3xl">
				게시글을 로드하는 데 실패하였습니다
			</p>
		);
	}

	return (
		<div className="w-full h-full font-pretendard pb-64">
			<p>
				<a href={baseUrl}>
					<span className="font-semibold">{project.name}</span> 프로젝트
				</a>
				&nbsp;&gt;&nbsp;
				<span className="font-semibold">{board.name}</span>
				{!board.name.endsWith("게시판") && " 게시판"}
			</p>
			<div className="flex flex-col lg:flex-row justify-between items-end border-b border-gray-400 py-4">
				<h2 className="text-4xl font-bold">{post.title}</h2>
				<div className="text-gray-400 text-sm mt-3 grid grid-cols-[repeat(2,max-content)] gap-x-2 tabular-nums">
					<p className="text-right">작성자</p>
					<p>
						{typeof post.author === "string" ? "알 수 없음" : post.author.name}
					</p>
					<p>작성 일자</p>
					<p>{new Date(post.createdAt).toLocaleString()}</p>
					<p>수정 일자</p>
					<p>{new Date(post.updatedAt).toLocaleString()}</p>
				</div>
			</div>
			<TiptapEditor
				readOnly
				content={post.content?.[0]}
				className="min-h-64 mb-24"
			/>
			<div className="flex justify-end mb-12">
				<button
					type="button"
					className="font-semibold border border-gray-300 px-4 py-1"
				>
					수정
				</button>
				<button
					type="button"
					className="font-semibold border border-gray-300 px-4 py-1 ml-2"
				>
					삭제
				</button>
			</div>
			<hr className="border-gray-300" />
			<h3 className="text-2xl font-semibold mt-6">
				댓글 ({post.comments?.length ?? 0})
			</h3>
			<div className="">
				{post.comments?.map((comment) => (
					<Comment
						key={comment.id}
						comment={comment}
						parent={post}
						className="border-t border-gray-400 first:border-none mt-6"
					/>
				))}
				<form className="block mt-6">
					<textarea
						name="content"
						placeholder="댓글 작성"
						className="w-full resize-none border border-gray-300 p-2 outline-none"
					/>
					<div className="flex justify-end">
						<button
							type="submit"
							className="font-semibold border border-gray-300 px-4 py-2"
						>
							댓글 달기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
