export * from "./types/config";
export * from "./types/viewer-info";
export * from "./types/inference";
export * from "./middleware";

import type { CloudFrontViewerInfo } from "./types/viewer-info";

declare module "hono" {
	interface ContextVariableMap {
		cloudFrontViewer: CloudFrontViewerInfo;
	}
}
