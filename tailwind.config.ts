import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				black: "#1f2025",
				identity: {
					100: "#dae0fe",
					200: "#b5c1fe",
					300: "#7386f9",
					400: "#465df6",
					500: "#3345d3",
					600: "#2331b1",
					700: "#16218e",
					800: "#0d1576",
				},
			},
			fontFamily: {
				pretendard: [
					"Pretendard Variable",
					"Pretendard",
					"-apple-system",
					"BlinkMacSystemFont",
					"system-ui",
					"Roboto",
					"Helvetica Neue",
					"Segoe UI",
					"Apple SD Gothic Neo",
					"Noto Sans KR",
					"Malgun Gothic",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"sans-serif",
				],
				sbaggro: [
					"SBAggro",
					"-apple-system",
					"BlinkMacSystemFont",
					"system-ui",
					"Roboto",
					"Helvetica Neue",
					"Segoe UI",
					"Apple SD Gothic Neo",
					"Noto Sans KR",
					"Malgun Gothic",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"sans-serif",
				],
				hanamdaum: [
					"HANAMDAUM",
					"-apple-system",
					"BlinkMacSystemFont",
					"system-ui",
					"Roboto",
					"Helvetica Neue",
					"Segoe UI",
					"Apple SD Gothic Neo",
					"Noto Sans KR",
					"Malgun Gothic",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"sans-serif",
				],
				"ibm-plex": ["IBM Plex Sans KR", "sans-serif"],
			},
			backgroundImage: {
				"customgrad-main": "linear-gradient(86deg, #3345D3 0%, #888DFF 100%)",
				"customgrad-main-0.5":
					"linear-gradient(86deg, rgba(51, 69, 211, 0.5) 0%, rgba(136, 141, 255, 0.5) 100%)",
				"customgrad-gray":
					"linear-gradient(270deg, #EBEBEB 12.78%, #E0E0E0 96.76%)",
				"customgrad-image":
					"linear-gradient(171deg, rgba(38, 50, 56, 0.00) 12.91%, #000 94.05%)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;
