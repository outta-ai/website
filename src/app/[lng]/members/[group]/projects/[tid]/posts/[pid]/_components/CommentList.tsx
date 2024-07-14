import type { Comment as CommentType } from "@payload/types";
import type { PaginatedDocs } from "payload/database";
import { Comment } from "./Comment";

type Props = {
	comments: PaginatedDocs<CommentType> | undefined;
	isLoading: boolean;
	isError: boolean;
};

export function CommentList({ comments, isLoading, isError }: Props) {
	if (isLoading) {
		return <h3 className="text-2xl font-semibold mt-6">댓글 (로딩중)</h3>;
	}

	if (isError || !comments) {
		return (
			<h3 className="text-2xl font-semibold mt-6">
				댓글 <span className="text-red-600">(!)</span>
			</h3>
		);
	}

	return (
		<div className="w-full">
			<h3 className="text-2xl font-semibold mt-6">
				댓글 ({comments.docs.length})
			</h3>
			{comments.docs.map((comment) => (
				<Comment key={comment.id} comment={comment} className="mt-3" />
			))}
		</div>
	);
}
