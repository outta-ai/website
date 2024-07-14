import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";
import { Langauges } from "./lib/i18n";

function LanguageLayer(req: NextRequest) {
	if (req.nextUrl.pathname.includes(".")) {
		return null;
	}

	const urlParts = req.nextUrl.pathname.split("/");
	if (urlParts.length >= 2 && Langauges.includes(urlParts[1])) {
		return null;
	}

	const headers = [...req.headers.entries()].reduce<
		Record<string, string | string[]>
	>((acc, [key, value]) => {
		if (key in acc) {
			const original = acc[key];
			const originalArray = Array.isArray(original) ? original : [original];
			acc[key] = [...originalArray, value];
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});
	const negotiatior = new Negotiator({ headers: headers });
	const language = negotiatior.language(Langauges) || "en";

	const languageCookie = req.cookies.get("LANGUAGE");
	const url = req.nextUrl.clone();
	if (languageCookie?.value) {
		url.pathname = `/${languageCookie.value}${url.pathname}`;
		return NextResponse.redirect(url.toString());
	}

	url.pathname = `/${language}${url.pathname}`;
	const response = NextResponse.redirect(url.toString());
	response.cookies.set("LANGUAGE", language);
	return response;
}

export const middleware = async (req: NextRequest) => {
	const language = LanguageLayer(req);
	if (language) return language;
	return NextResponse.next();
};

export const config = {
	matcher: ["/((?!_next).*)", "/((?!.next).*)"],
};
