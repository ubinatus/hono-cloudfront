import type {
	CloudFrontViewerConfig,
	DeviceTypeConfig,
	LocationConfig,
	NetworkConfig,
	ProtocolConfig,
} from "./config";
import type { CloudFrontViewerInfo } from "./viewer-info";

/**
 * Helper type to extract enabled properties from a category config
 */
type ExtractEnabledProperties<T> = {
	[K in keyof T]: T[K] extends true ? K : never;
}[keyof T];

/**
 * Helper type to extract properties based on location config
 */
type InferLocationProperties<T> = T extends true
	? keyof LocationConfig extends string
		? Record<
				| "country"
				| "city"
				| "countryName"
				| "countryRegion"
				| "countryRegionName"
				| "latitude"
				| "longitude"
				| "metroCode"
				| "postalCode"
				| "timeZone",
				string | undefined
			>
		: never
	: T extends LocationConfig
		? Record<ExtractEnabledProperties<T> & string, string | undefined>
		: Record<string, never>;

/**
 * Helper type to extract properties based on device type config
 */
type InferDeviceTypeProperties<T> = T extends true
	? keyof DeviceTypeConfig extends string
		? Record<
				| "isAndroidViewer"
				| "isDesktopViewer"
				| "isIosViewer"
				| "isMobileViewer"
				| "isSmartTvViewer"
				| "isTabletViewer",
				boolean | undefined
			>
		: never
	: T extends DeviceTypeConfig
		? Record<
				`is${Capitalize<ExtractEnabledProperties<T> & string>}Viewer`,
				boolean | undefined
			>
		: Record<string, never>;

/**
 * Helper type to extract properties based on network config
 */
type InferNetworkProperties<T> = T extends true
	? keyof NetworkConfig extends string
		? Record<"address" | "asn", string | undefined>
		: never
	: T extends NetworkConfig
		? Record<ExtractEnabledProperties<T> & string, string | undefined>
		: Record<string, never>;

/**
 * Helper type to extract properties based on protocol config
 */
type InferProtocolProperties<T> = T extends true
	? keyof ProtocolConfig extends string
		? Record<"protocol" | "httpVersion", string | undefined>
		: never
	: T extends ProtocolConfig
		? Record<ExtractEnabledProperties<T> & string, string | undefined>
		: Record<string, never>;

/**
 * Infers the CloudFront viewer information type based on the configuration
 */
export type InferCloudFrontViewerInfo<T extends CloudFrontViewerConfig> =
	T extends { all: true }
		? CloudFrontViewerInfo
		: InferLocationProperties<T["location"]> &
				InferDeviceTypeProperties<T["deviceType"]> &
				InferNetworkProperties<T["network"]> &
				InferProtocolProperties<T["protocol"]>;
