import crypto from "node:crypto";

import { cookies } from "next/headers";

export class NoKeyError extends Error {}
export class InvalidKeyLengthError extends Error {}
export class NoCookieError extends Error {}
export class InvalidCookieFormatError extends Error {}
export class InvalidAuthTagLengthError extends Error {}
export class InvalidIVLengthError extends Error {}
export class DecryptError extends Error {}
export class EncryptError extends Error {}

export async function getEncryptedCookie(name: string, secret?: string) {
	if (!secret) {
		throw new NoKeyError();
	}

	const key = Buffer.from(secret, "hex");
	if (key.length * 8 !== 256) {
		throw new InvalidKeyLengthError(
			`Expected 32 bytes (256 bits), but got ${key.length} bytes (${
				key.length * 8
			} bits)`,
		);
	}

	const cookie = cookies().get(name);
	if (!cookie?.value) {
		throw new NoCookieError();
	}

	const params = cookie.value.split("-");
	if (params.length !== 3) {
		throw new InvalidCookieFormatError();
	}

	const authTag = Buffer.from(params[1], "hex");
	if (authTag.length !== 16) {
		throw new InvalidAuthTagLengthError();
	}

	const iv = Buffer.from(params[2], "hex");
	if (iv.length !== 16) {
		throw new InvalidIVLengthError();
	}

	try {
		const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
		decipher.setAuthTag(authTag);
		return decipher.update(params[0], "hex", "utf-8") + decipher.final("utf-8");
	} catch (error) {
		throw new DecryptError();
	}
}

export function toEncryptedCookie(data: string, secret?: string): string {
	if (!secret) {
		throw new NoKeyError();
	}

	const key = Buffer.from(secret, "hex");
	if (key.length * 8 !== 256) {
		throw new InvalidKeyLengthError(
			`Expected 32 bytes (256 bits), but got ${key.length} bytes (${
				key.length * 8
			} bits)`,
		);
	}

	const iv = crypto.randomBytes(16);

	try {
		const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
		let encrypted = cipher.update(data, "utf-8", "hex");
		encrypted += cipher.final("hex");
		const authTag = cipher.getAuthTag().toString("hex");
		return `${encrypted}-${authTag}-${iv.toString("hex")}`;
	} catch (error) {
		if (error instanceof Error) {
			throw new EncryptError(error.message, {
				cause: error.cause,
			});
		}
		throw new EncryptError();
	}
}
