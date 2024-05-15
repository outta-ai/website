"use client";

import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { useEffect, useRef } from "react";

export function ChannelIO() {
	const initRef = useRef(false);

	useEffect(() => {
		if (initRef.current) {
			return;
		}

		initRef.current = true;

		ChannelService.loadScript();
		ChannelService.boot({
			pluginKey: process.env.NEXT_PUBLIC_CHANNEL_KEY || "",
		});
	}, []);

	return null;
}
