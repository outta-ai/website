import {
	getID,
	getPayloadAll,
	getPayloadOne,
	type Optional,
} from "@/lib/payload";
import { getUserInfo } from "@/lib/user";
import type { Board, Member, Post } from "@payload/types";
import { useQuery } from "@tanstack/react-query";

export function useProject(group: string | undefined, tid: string) {
	return useQuery({
		queryKey: ["project", tid, group],
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
}

export function usePost(post: Optional<string | Post>) {
	const id = post ? getID(post) : "";

	return useQuery({
		queryKey: ["post", id],
		queryFn: () => getPayloadOne("posts", id),
		enabled: typeof post === "string",
	});
}

export function usePosts(board: Optional<string | Board>, page: number) {
	const id = board ? getID(board) : "";

	return useQuery({
		queryKey: ["board", id, "posts", page],
		queryFn: () =>
			getPayloadAll(
				"posts",
				{ board: { equals: id } },
				new URLSearchParams({
					sort: "createdAt",
					limit: "10",
					page: page.toString(),
				}),
			),
		enabled: !!board,
	});
}

export function useBoard(board: Optional<string | Board>) {
	const id = board ? getID(board) : "";

	return useQuery({
		queryKey: ["board", id],
		queryFn: () => getPayloadOne("boards", id),
		enabled: typeof board === "string",
	});
}

export function useComments(post: Optional<string | Post>) {
	const id = post ? getID(post) : "";

	return useQuery({
		queryKey: ["post", id, "comments"],
		queryFn: () =>
			getPayloadAll(
				"comments",
				{ post: { equals: id } },
				new URLSearchParams({ depth: "0", sort: "createdAt" }),
			),
		enabled: !!post,
	});
}

export function useMember(member: Optional<string | Member>) {
	const id = member ? getID(member) : "";

	return useQuery({
		queryKey: ["member", id],
		queryFn: () => getPayloadOne("members", id || ""),
		enabled: typeof member === "string",
	});
}

export function useMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => getUserInfo({ refresh: true }),
	}).data;
}
