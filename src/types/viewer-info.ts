/**
 * Interface representing CloudFront viewer information extracted from request headers
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-cloudfront-headers.html
 */
export interface CloudFrontViewerInfo {
	/**
	 * IP address and port of the viewer (e.g., "198.51.100.10:46532")
	 * @header CloudFront-Viewer-Address
	 */
	address?: string;
	/**
	 * Autonomous system number (ASN) of the viewer
	 * @header CloudFront-Viewer-ASN
	 */
	asn?: string;
	/**
	 * Two-letter country code (ISO 3166-1 alpha-2) of the viewer
	 * @header CloudFront-Viewer-Country
	 */
	country?: string;
	/**
	 * Name of the viewer's city
	 * @header CloudFront-Viewer-City
	 */
	city?: string;
	/**
	 * Full name of the viewer's country
	 * @header CloudFront-Viewer-Country-Name
	 */
	countryName?: string;
	/**
	 * Region code (up to three characters) representing the viewer's region
	 * @header CloudFront-Viewer-Country-Region
	 */
	countryRegion?: string;
	/**
	 * Full name of the viewer's region
	 * @header CloudFront-Viewer-Country-Region-Name
	 */
	countryRegionName?: string;
	/**
	 * Viewer's approximate latitude
	 * @header CloudFront-Viewer-Latitude
	 */
	latitude?: string;
	/**
	 * Viewer's approximate longitude
	 * @header CloudFront-Viewer-Longitude
	 */
	longitude?: string;
	/**
	 * Viewer's metro code (US only)
	 * @header CloudFront-Viewer-Metro-Code
	 */
	metroCode?: string;
	/**
	 * Viewer's postal code
	 * @header CloudFront-Viewer-Postal-Code
	 */
	postalCode?: string;
	/**
	 * Viewer's time zone in IANA format (e.g., "America/Los_Angeles")
	 * @header CloudFront-Viewer-Time-Zone
	 */
	timeZone?: string;
	/**
	 * Protocol used by the viewer (e.g., "https")
	 * @header CloudFront-Forwarded-Proto
	 */
	protocol?: string;
	/**
	 * Whether the viewer is using an Android device
	 * @header CloudFront-Is-Android-Viewer
	 */
	isAndroidViewer?: boolean;
	/**
	 * Whether the viewer is using a desktop browser
	 * @header CloudFront-Is-Desktop-Viewer
	 */
	isDesktopViewer?: boolean;
	/**
	 * Whether the viewer is using an iOS device
	 * @header CloudFront-Is-IOS-Viewer
	 */
	isIosViewer?: boolean;
	/**
	 * Whether the viewer is using a mobile device
	 * @header CloudFront-Is-Mobile-Viewer
	 */
	isMobileViewer?: boolean;
	/**
	 * Whether the viewer is using a smart TV
	 * @header CloudFront-Is-SmartTV-Viewer
	 */
	isSmartTvViewer?: boolean;
	/**
	 * Whether the viewer is using a tablet
	 * @header CloudFront-Is-Tablet-Viewer
	 */
	isTabletViewer?: boolean;
	/**
	 * HTTP version used by the viewer (e.g., "2.0")
	 * @header CloudFront-Viewer-Http-Version
	 */
	httpVersion?: string;
}
