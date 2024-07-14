import type { Config } from "@payload/types";
import * as payloadZod from "@payload/zod";

import type { Where } from "payload/dist/types";
import qs from "qs";
import { z } from "zod";

type KebabCaseToCamelCase<S extends string> = S extends `${infer L}-${infer R}`
	? `${Lowercase<L>}${Capitalize<KebabCaseToCamelCase<R>>}`
	: Lowercase<S>;

type ToSchemaKey<K> = K extends keyof typeof payloadZod ? K : never;

type SchemaKeyFromCollectionName<K extends keyof Config["collections"]> =
	ToSchemaKey<
		KebabCaseToCamelCase<K> extends `${infer L}s` ? `${L}Schema` : `${K}Schema`
	>;

type SchemaFromCollectionName<K extends keyof Config["collections"]> =
	(typeof payloadZod)[SchemaKeyFromCollectionName<K>];

export const paginatedSchema = <K extends keyof Config["collections"]>(
	schema: SchemaFromCollectionName<K>,
) =>
	z.object({
		docs: z.array(schema) as z.ZodArray<SchemaFromCollectionName<K>>,
		hasNextPage: z.boolean(),
		hasPrevPage: z.boolean(),
		limit: z.number(),
		nextPage: z.number().nullable(),
		page: z.number().optional(),
		pagingCounter: z.number(),
		prevPage: z.number().nullable(),
		totalDocs: z.number(),
		totalPages: z.number(),
	});

export const errorSchema = z.object({
	error: z.array(
		z
			.object({
				message: z.string(),
			})
			.passthrough(),
	),
});

export const responseSchema = <T extends z.ZodType>(schema: T) => {
	return z.union([
		z.object({
			doc: schema,
			message: z.string(),
		}),
		errorSchema,
	]);
};

function collectionNameToSchemaKey<K extends keyof Config["collections"]>(
	key: K,
): SchemaKeyFromCollectionName<K> {
	const camelCase = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
	if (camelCase.endsWith("s")) {
		return `${camelCase.slice(0, -1)}Schema` as SchemaKeyFromCollectionName<K>;
	}
	return camelCase as SchemaKeyFromCollectionName<K>;
}

export async function getPayloadOne<K extends keyof Config["collections"]>(
	key: K,
	id: string,
	where?: Where,
	params?: URLSearchParams,
): Promise<z.infer<SchemaFromCollectionName<K>>> {
	const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/${key}/${id}`);

	if (where) {
		const whereURL = new URL(`about:blank?${qs.stringify({ where })}`);
		for (const [key, value] of whereURL.searchParams.entries()) {
			url.searchParams.append(key, value);
		}
	}

	if (params) {
		for (const [key, value] of params) {
			url.searchParams.append(key, value);
		}
	}

	const res = await fetch(url, {
		credentials: "include",
	});

	const text = await res.text();
	const data = JSON.parse(text);

	const schemaKey = collectionNameToSchemaKey(key);
	const schema = payloadZod[schemaKey];

	const result = z.union([schema, errorSchema]).parse(data);
	if ("error" in result) {
		console.error(result.error);
		throw new Error(JSON.stringify(result.error));
	}
	// We already know that the result is a valid schema
	return result as z.infer<SchemaFromCollectionName<K>>;
}

export async function getPayloadAll<K extends keyof Config["collections"]>(
	key: K,
	where?: Where,
	params?: URLSearchParams,
): Promise<z.infer<ReturnType<typeof paginatedSchema<K>>>> {
	const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/${key}`);

	if (where) {
		const whereURL = new URL(`about:blank?${qs.stringify({ where })}`);
		for (const [key, value] of whereURL.searchParams.entries()) {
			url.searchParams.append(key, value);
		}
	}

	if (params) {
		for (const [key, value] of params) {
			url.searchParams.append(key, value);
		}
	}

	const res = await fetch(url, {
		credentials: "include",
	});

	const text = await res.text();
	const data = JSON.parse(text);

	const schemaKey = collectionNameToSchemaKey(key);
	const schema = payloadZod[schemaKey];
	const result = z.union([paginatedSchema(schema), errorSchema]).parse(data);
	if ("error" in result) {
		throw new Error(JSON.stringify(result.error));
	}
	return result;
}

export type Optional<T> = T | null | undefined;

export function getID<T extends { id: string }>(data: T | string) {
	if (typeof data === "string") {
		return data;
	}

	return data.id;
}

export function getOptionalID<T extends { id: string } | null>(
	data: Optional<T | string>,
) {
	if (!data) {
		return null;
	}

	if (typeof data === "string") {
		return data;
	}

	return data.id;
}

export function mergeQuery<T, U>(data: Optional<T>, queryData: Optional<U>) {
	if (typeof data === "object") {
		return data;
	}

	return queryData;
}
