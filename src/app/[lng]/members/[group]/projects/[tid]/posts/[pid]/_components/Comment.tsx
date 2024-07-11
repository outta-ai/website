import { shortDate } from "@/lib/date";
import { getID, getPayloadOne } from "@/lib/payload";
import { getUserInfo } from "@/lib/user";
import type { Post } from "@payload/types";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";

type Comment = Post["comments"] extends (infer T)[] | null | undefined
	? T
	: never;

type Props = {
	comment: Comment | null | undefined;
	parent: Post;
	className?: string;
};

export function Comment({ comment, parent, className }: Props) {
	const [onEdit, setOnEdit] = useState(false);

	const authorId = comment?.author && getID(comment.author);
	const { data, isLoading } = useQuery({
		queryKey: ["member", authorId],
		queryFn: () =>
			getPayloadOne(
				"members",
				authorId || "",
				undefined,
				new URLSearchParams({ "parent[post]": parent.id }),
			),
		enabled: typeof comment?.author === "string",
	});

	const { data: me } = useQuery({
		queryKey: ["me"],
		queryFn: () => getUserInfo({ refresh: true }),
	});

	const author = typeof comment?.author === "object" ? comment.author : data;

	if (isLoading || !comment || !author) {
		return null;
	}

	const updatedAt =
		comment.createdAt !== comment.updatedAt &&
		`(${shortDate(new Date(comment.updatedAt))})`;

	return (
		<div className={className}>
			<div className="flex items-center">
				<p className="font-semibold">{author.name}</p>
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
			<textarea
				className={classNames(
					onEdit ? "block" : "hidden",
					"w-full mt-3 p-2 resize-none border border-300 outline-none",
				)}
				defaultValue={comment.content || ""}
			/>
		</div>
	);
}
