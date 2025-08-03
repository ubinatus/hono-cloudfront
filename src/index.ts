export * from "./middleware";
export * from "./types/config";
export * from "./types/inference";
export * from "./types/viewer-info";

import type { CloudFrontViewerInfo } from "./types/viewer-info";

declare module "hono" {
	interface ContextVariableMap {
		cloudFrontViewer: CloudFrontViewerInfo;
	}
}
