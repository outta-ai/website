import { useMemo } from "react";

export function useLanguage() {
	const language = useMemo(() => {
		if (typeof window === "undefined") return null;
		const url = new URL(window.location.href);
		return url.pathname.split("/")[1];
	}, []);

	return language;
}
