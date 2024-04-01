import { WebsiteMain } from "@/../payload-types";

type NonNull<T> = T extends null ? never : T extends undefined ? never : T;

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Member = ArrayElement<NonNull<WebsiteMain["board_members"]>>;
