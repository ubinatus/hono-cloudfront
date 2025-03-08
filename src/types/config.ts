/**
 * Configuration options for location-related headers
 */
export interface LocationConfig {
	country?: boolean;
	city?: boolean;
	countryName?: boolean;
	countryRegion?: boolean;
	countryRegionName?: boolean;
	latitude?: boolean;
	longitude?: boolean;
	metroCode?: boolean;
	postalCode?: boolean;
	timeZone?: boolean;
}

/**
 * Configuration options for device type headers
 */
export interface DeviceTypeConfig {
	android?: boolean;
	desktop?: boolean;
	ios?: boolean;
	mobile?: boolean;
	smartTv?: boolean;
	tablet?: boolean;
}

/**
 * Configuration options for network headers
 */
export interface NetworkConfig {
	address?: boolean;
	asn?: boolean;
}

/**
 * Configuration options for protocol headers
 */
export interface ProtocolConfig {
	protocol?: boolean;
	httpVersion?: boolean;
}

/**
 * Configuration options for the CloudFront viewer middleware
 */
export interface CloudFrontViewerConfig {
	/** Extract all available headers (overrides other options) */
	all?: boolean;
	/** Configure location-related headers */
	location?: boolean | LocationConfig;
	/** Configure device type headers */
	deviceType?: boolean | DeviceTypeConfig;
	/** Configure network headers */
	network?: boolean | NetworkConfig;
	/** Configure protocol headers */
	protocol?: boolean | ProtocolConfig;
}
