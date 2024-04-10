export function unsafeHash(key: string) {
	let hash = 5381; // Initial hash value
	for (let i = 0; i < key.length; i++) {
		const char = key.charCodeAt(i);
		hash = (hash * 33) ^ char; // Equivalent to: hash * 33 + char
	}
	return hash >>> 0; // Ensure the hash is a non-negative integer
}
