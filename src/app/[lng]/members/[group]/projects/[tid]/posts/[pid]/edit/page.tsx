"use client";

import { TiptapEditor } from "@/components/TiptapEditor";
import { useBoard, usePost, useProject } from "@/hooks/payload";
import { useQueryClient } from "@tanstack/react-query";
import type { Editor } from "@tiptap/core";
import { redirect, useRouter } from "next/navigation";
import { type FormEvent, useCallback, useRef } from "react";

type Props = {
	params: {
		lng: string;
		group: string;
		tid: string;
		pid: string;
	};
};

export default function EditPostPage({
	params: { lng, group, tid, pid },
}: Props) {
	const router = useRouter();
	const editorRef = useRef<{ editor: Editor }>(null);

	const queryClient = useQueryClient();

	const { data: project, isLoading: isProjectLoading } = useProject(group, tid);
	const { data: post, isLoading: isPostLoading } = usePost(pid);
	const { data: board, isLoading: isBoardLoading } = useBoard(post?.board);

	const baseUrl = `/${lng}/members/${group}/projects/${tid}`;

	const editPost = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (!board || !editorRef.current) {
				return;
			}

			const editor = editorRef.current.editor;

			const formData = new FormData(e.currentTarget);
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${pid}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: formData.get("title"),
					content: [editor.getJSON()],
				}),
				credentials: "include",
			});

			queryClient.invalidateQueries({
				queryKey: ["board", board?.id, "posts"],
			});
			queryClient.invalidateQueries({
				queryKey: ["post", pid],
			});

			router.push(baseUrl);
		},
		[queryClient, board, pid, router, baseUrl],
	);

	if (isProjectLoading || isBoardLoading || isPostLoading) {
		return (
			<p className="text-center text-3xl text-gray-300">게시판 로딩중...</p>
		);
	}

	if (!project || !board || !post?.content) {
		redirect(baseUrl);
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
			<form onSubmit={editPost}>
				<input
					name="title"
					type="text"
					className="w-full border border-gray-300 p-2 mt-4 outline-none"
					placeholder="제목"
					defaultValue={post.title}
				/>
				<TiptapEditor
					ref={editorRef}
					className="min-h-64 mt-6 mb-6 border border-gray-300"
					content={post.content[0]}
				/>
				<div className="flex justify-end mb-12">
					<button
						type="submit"
						className="font-semibold border border-gray-300 px-4 py-1"
					>
						글쓰기
					</button>
				</div>
			</form>
		</div>
	);
}
