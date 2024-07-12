"use client";

import { refreshToken } from "@/lib/auth";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

export default function RootProviders({ children }: PropsWithChildren) {
	const [isRetrying, setIsRetrying] = useState(false);

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
			queryCache: new QueryCache({
				onError: async (error) => {
					if (!(error instanceof HandledUnauthorizedError)) {
						return;
					}

					if (isRetrying) {
						return;
					}

					setIsRetrying(true);
					const retryResult = await refreshToken();
					if (retryResult) {
						queryClient.invalidateQueries();
						setIsRetrying(false);
					}
				},
			}),
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

export class HandledUnauthorizedError extends Error {
	constructor() {
		super("Unauthorized [Handled]");
	}
}

export function fetchWrapper(fn: () => Promise<Response>) {
	return fn().then((res) => {
		if (res.status === 401 || res.status === 403) {
			throw new HandledUnauthorizedError();
		}
		return res;
	});
}
