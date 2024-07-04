"use client";

import { PropsWithChildren, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: PropsWithChildren) {
	const [queryClient, _] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnMount: true,
					refetchOnWindowFocus: true,
					refetchOnReconnect: true,
					refetchInterval: false,
				},
			},
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
