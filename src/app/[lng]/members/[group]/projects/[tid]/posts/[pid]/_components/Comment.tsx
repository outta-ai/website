import { useMe, useMember } from "@/hooks/payload";
import { shortDate } from "@/lib/date";
import { getID, mergeQuery } from "@/lib/payload";
import type { Comment as CommentType } from "@payload/types";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { type FormEvent, useCallback, useState } from "react";

type Props = {
	comment: CommentType;
	className?: string;
};

export function Comment({ comment, className }: Props) {
	const queryClient = useQueryClient();

	const [onEdit, setOnEdit] = useState(false);

	const me = useMe();
	const { data: authorQuery } = useMember(comment.author);
	const author = mergeQuery(comment.author, authorQuery);
	const authorId = getID(comment.author);

	const updatedAt =
		comment.createdAt !== comment.updatedAt &&
		`(${shortDate(new Date(comment.updatedAt))})`;

	const modifyComment = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);

			await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${comment.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ content: formData.get("content") }),
					credentials: "include",
				},
			);

			queryClient.invalidateQueries({
				queryKey: ["post", getID(comment.post), "comments"],
			});

			setOnEdit(false);
		},
		[queryClient, comment],
	);

	const deleteComment = useCallback(async () => {
		await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${comment.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ deletedAt: new Date().toISOString() }),
				credentials: "include",
			},
		);

		queryClient.invalidateQueries({
			queryKey: ["post", getID(comment.post), "comments"],
		});
	}, [queryClient, comment]);

	return (
		<div className={className}>
			<div className="flex items-center">
				<p
					className={classNames("font-semibold", author ? "" : "text-gray-400")}
				>
					{author?.name || "로딩중"}
				</p>
				<div className="flex-1" />
				<button
					type="button"
					className={classNames(
						me?.id === authorId ? "block" : "hidden",
						"font-semibold px-2 hover:underline",
					)}
					onClick={() => setOnEdit(!onEdit)}
				>
					{onEdit ? "취소" : "수정"}
				</button>
				<button
					type="button"
					onClick={deleteComment}
					className={classNames(
						me?.id === authorId && !onEdit ? "block" : "hidden",
						"font-semibold px-2 hover:underline",
					)}
				>
					삭제
				</button>
				<p className="text-gray-400">
					{shortDate(new Date(comment.createdAt))}
					{updatedAt}
				</p>
			</div>
			<p className={onEdit ? "hidden" : "block"}>{comment.content}</p>
			<form
				onSubmit={modifyComment}
				className={classNames(
					onEdit ? "flex flex-col" : "hidden",
					"w-full mt-3 items-end",
				)}
			>
				<textarea
					className={classNames(
						onEdit ? "block" : "hidden",
						"w-full p-2 resize-none border border-300 outline-none",
					)}
					name="content"
					defaultValue={comment.content || ""}
				/>
				<button
					type="submit"
					className="mt-3 font-semibold border border-gray-300 px-4 py-2"
				>
					확인
				</button>
			</form>
		</div>
	);
}
