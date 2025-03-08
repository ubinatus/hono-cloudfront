export * from "./types/config";
export * from "./types/viewer-info";
export * from "./types/inference";
export * from "./middleware";

import type { CloudFrontViewerConfig } from "./types/config";
import type { InferCloudFrontViewerInfo } from "./types/inference";
import type { CloudFrontViewerInfo } from "./types/viewer-info";

declare module "hono" {
	interface ContextVariableMap {
		cloudFrontViewer: InferCloudFrontViewerInfo<CloudFrontViewerConfig>;
	}
}
