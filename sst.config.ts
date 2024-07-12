/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "website",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
			providers: {
				aws: {
					region: "ap-northeast-2",
				},
				cloudflare: true,
			},
		};
	},
	async run() {
		new sst.aws.Nextjs("Website", {
			domain: {
				name: new URL(process.env.NEXT_PUBLIC_BASE_URL || "").hostname,
				cert: "arn:aws:acm:us-east-1:531324016833:certificate/9b495b2a-ff45-491c-9800-fb3f97908435",
				dns: sst.cloudflare.dns({
					zone: process.env.CLOUDFLARE_ZONE_ID,
				}),
			},
		});
	},
	console: {
		autodeploy: {
			target(event) {
				if (event.type === "branch" && event.branch === "develop") {
					return {
						stage: "develop",
						runner: {
							engine: "codebuild",
							compute: "small",
						},
					};
				}
				if (event.type === "branch" && event.branch === "main") {
					return {
						stage: "production",
						runner: {
							engine: "codebuild",
							compute: "small",
						},
					};
				}
			},
		},
	},
});
