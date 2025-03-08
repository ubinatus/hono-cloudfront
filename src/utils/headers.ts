/**
 * Helper function to check if a configuration object is enabled
 */
export const isConfigEnabled = <T>(
	config: boolean | T | undefined,
): config is T => {
	return typeof config === "object";
};

/**
 * Helper function to convert header value to boolean or undefined
 */
export const toBooleanOrUndefined = (
	value: string | null,
): boolean | undefined => {
	return value === null ? undefined : value === "true";
};
