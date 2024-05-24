import { Media } from "@payload/types";

export function getImage(image: string | Media) {
	if (typeof image === "string") {
		return image;
	}

	return image.url ?? "";
}
