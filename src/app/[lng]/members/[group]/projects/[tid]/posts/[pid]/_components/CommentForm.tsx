import { getID } from "@/lib/payload";
import type { Post } from "@payload/types";
import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useCallback } from "react";

type Props = {
	post: Post | null | undefined;
};

export function CommentForm({ post }: Props) {
	const queryClient = useQueryClient();

	const postComment = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const target = e.currentTarget;
			const formData = new FormData(e.currentTarget);
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(Object.fromEntries(formData)),
				credentials: "include",
			});

			queryClient.invalidateQueries({
				queryKey: ["post", post?.id, "comments"],
			});

			target.reset();
		},
		[queryClient, post],
	);

	if (!post) {
		return null;
	}

	return (
		<form className="block mt-6" onSubmit={postComment}>
			<input type="hidden" name="author" value={getID(post.author)} />
			<input type="hidden" name="post" value={post.id} />
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
	);
}
