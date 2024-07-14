"use client";

import { TiptapEditor } from "@/components/TiptapEditor/TiptapEditor";
import {
	useBoard,
	useComments,
	useMe,
	usePost,
	useProject,
} from "@/hooks/payload";
import { useLanguage } from "@/hooks/useLanguages";
import { getID, mergeQuery } from "@/lib/payload";
import classNames from "classnames";
import { useCallback } from "react";
import { CommentForm } from "./_components/CommentForm";
import { CommentList } from "./_components/CommentList";
import { useRouter } from "next/navigation";

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
	const me = useMe();
	const { isLoading: isProjectLoading, data: project } = useProject(group, tid);
	const { isLoading: isPostLoading, data: post } = usePost(pid);
	const { isLoading: isBoardLoading, data: boardQuery } = useBoard(post?.board);
	const {
		isLoading: isCommentLoading,
		isError: isCommentError,
		data: comments,
	} = useComments(pid);

	const board = mergeQuery(post?.board, boardQuery);

	const language = useLanguage();
	const baseUrl = `/${language}/members/${group}/projects/${tid}`;

	const router = useRouter();

	const deletePost = useCallback(async () => {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${pid}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ deletedAt: new Date().toISOString() }),
			credentials: "include",
		});

		router.push(baseUrl);
	}, [pid, router, baseUrl]);

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
				<span className="font-semibold">{board.title}</span>
				{!board.title.endsWith("게시판") && " 게시판"}
			</p>
			<div className="flex flex-col lg:flex-row justify-between items-end border-b border-gray-400 py-4">
				<h2 className="text-4xl font-bold w-full">{post.title}</h2>
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
			<div
				className={classNames(
					"flex justify-end mb-12",
					(!me || getID(post.author) !== me.id) && "hidden",
				)}
			>
				<a
					href={`${baseUrl}/posts/${pid}/edit`}
					className="block font-semibold border border-gray-300 px-4 py-1"
				>
					수정
				</a>
				<button
					type="button"
					onClick={deletePost}
					className="font-semibold border border-gray-300 px-4 py-1 ml-2"
				>
					삭제
				</button>
			</div>
			<hr className="border-gray-300" />
			<CommentList
				comments={comments}
				isLoading={isCommentLoading}
				isError={isCommentError}
			/>
			<CommentForm post={post} />
		</div>
	);
}
