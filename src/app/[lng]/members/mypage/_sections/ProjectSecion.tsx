"use client";

import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { type ProjectsResponse, getUserProjects } from "./actions";

function ProjectCard({
	project,
}: { project: z.infer<typeof ProjectsResponse>["data"][0] }) {
	const link = project.link
		? `/members/${project.category}/projects/${project.link}`
		: `/members/${project.category}/projects/${project.id}`;

	return (
		<li className="block border border-zinc-600 rounded-md">
			<a href={link} className="w-full h-full block p-4">
				{project.name}
				{project.admin && <span className="text-red-500"> (관리자)</span>}
			</a>
		</li>
	);
}

export function ProjectSection() {
	const { isPending, data } = useQuery({
		queryKey: ["me", "projects"],
		queryFn: () => getUserProjects({ refresh: true }),
	});

	if (isPending || !data) {
		return (
			<div className="w-full px-3 lg:px-48 mt-12">
				<h3 className="text-2xl font-semibold mb-3">활동 내역</h3>
				<p className="text-gray-400">로딩중...</p>
			</div>
		);
	}

	const labsProject = data.filter((project) => project.category === "labs");
	const playgroundProject = data.filter(
		(project) => project.category === "playground",
	);
	const outtaProject = data.filter((project) => project.category === "outta");

	return (
		<div className="w-full px-3 lg:px-48 mt-12">
			<h3 className="text-2xl font-semibold mb-3">활동 내역</h3>
			{outtaProject.length > 0 && (
				<div className="mb-6">
					<h4 className="text-xl font-semibold mb-3">OUTTA</h4>
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{outtaProject.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</ul>
				</div>
			)}
			{labsProject.length > 0 && (
				<div className="mb-6">
					<h4 className="text-xl font-semibold mb-3">OUTTA AI 연구소</h4>

					<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{labsProject.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</ul>
				</div>
			)}
			{playgroundProject.length > 0 && (
				<div className="mb-6">
					<h4 className="text-xl font-semibold mb-3">OUTTA AI Playground</h4>
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{playgroundProject.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
