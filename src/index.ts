export * from "./middleware.js";
export * from "./types/config.js";
export * from "./types/inference.js";
export * from "./types/viewer-info.js";

import type { CloudFrontViewerInfo } from "./types/viewer-info.js";

declare module "hono" {
	interface ContextVariableMap {
		cloudFrontViewer: CloudFrontViewerInfo;
	}
}
