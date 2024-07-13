"use client";

import { TiptapEditor } from "@/components/TiptapEditor";
import { useBoard, useProject } from "@/hooks/payload";
import { useQueryClient } from "@tanstack/react-query";
import type { Editor } from "@tiptap/core";
import { redirect } from "next/navigation";
import { type FormEvent, useCallback, useRef } from "react";

type Props = {
	params: {
		lng: string;
		group: string;
		tid: string;
	};
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
};

export default function NewPostPage({
	params: { lng, group, tid },
	searchParams,
}: Props) {
	const editorRef = useRef<{ editor: Editor }>(null);

	const queryClient = useQueryClient();

	const boardId = Array.isArray(searchParams.board)
		? undefined
		: searchParams.board;

	const { data: project, isLoading: isProjectLoading } = useProject(group, tid);
	const { data: board, isLoading: isBoardLoading } = useBoard(boardId);

	const newPost = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (!board || !editorRef.current) {
				return;
			}

			const editor = editorRef.current.editor;

			const target = e.currentTarget;
			const formData = new FormData(e.currentTarget);
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: formData.get("title"),
					board: board.id,
					content: [editor.getJSON()],
				}),
				credentials: "include",
			});

			queryClient.invalidateQueries({
				queryKey: ["board", board?.id, "posts"],
			});

			target.reset();
		},
		[queryClient, board],
	);

	if (isProjectLoading || isBoardLoading) {
		return (
			<p className="text-center text-3xl text-gray-300">게시판 로딩중...</p>
		);
	}

	if (!project || !board) {
		redirect(`/${lng}/members/${group}/projects/${tid}`);
	}

	const baseUrl = `/${lng}/members/${group}/projects/${tid}`;

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
			<form onSubmit={newPost}>
				<input
					name="title"
					type="text"
					className="w-full border border-gray-300 p-2 mt-4 outline-none"
					placeholder="제목"
				/>
				<TiptapEditor
					ref={editorRef}
					className="min-h-64 mt-6 mb-6 border border-gray-300"
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
