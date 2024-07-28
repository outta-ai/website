import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function usePage() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const page = useMemo(() => {
		const param = params.get("page");
		if (!param) {
			return 1;
		}

		const parsed = Number.parseInt(param);
		if (Number.isNaN(parsed)) {
			return 1;
		}

		return parsed;
	}, [params]);

	const setPage = useCallback(
		(page: number) => {
			const newParams = new URLSearchParams(params);
			newParams.set("page", page.toString());
			router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
		},
		[router, pathname, params],
	);

	return [page, setPage] as const;
}
