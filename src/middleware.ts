import type { MiddlewareHandler } from "hono";
import type { CloudFrontViewerConfig } from "./types/config";
import type { CloudFrontViewerInfo } from "./types/viewer-info";
import { isConfigEnabled, toBooleanOrUndefined } from "./utils/headers";

/**
 * Hono middleware that extracts CloudFront viewer information from request headers
 * and makes it available through `c.get("cloudFrontViewer")`.
 */
export const cloudFrontViewer = (
	config: CloudFrontViewerConfig = { all: true },
): MiddlewareHandler => {
	return async (c, next) => {
		const headers = c.req.raw.headers;
		const viewerInfo: CloudFrontViewerInfo = {};

		if (config.all || config.network) {
			const networkConfig = isConfigEnabled(config.network)
				? config.network
				: undefined;

			if (config.all || config.network === true || networkConfig?.address) {
				viewerInfo.address =
					headers.get("CloudFront-Viewer-Address") ?? undefined;
			}
			if (config.all || config.network === true || networkConfig?.asn) {
				viewerInfo.asn = headers.get("CloudFront-Viewer-ASN") ?? undefined;
			}
		}

		if (config.all || config.location) {
			const locationConfig = isConfigEnabled(config.location)
				? config.location
				: undefined;

			if (config.all || config.location === true || locationConfig?.country) {
				viewerInfo.country =
					headers.get("CloudFront-Viewer-Country") ?? undefined;
			}
			if (config.all || config.location === true || locationConfig?.city) {
				viewerInfo.city = headers.get("CloudFront-Viewer-City") ?? undefined;
			}
			if (
				config.all ||
				config.location === true ||
				locationConfig?.countryName
			) {
				viewerInfo.countryName =
					headers.get("CloudFront-Viewer-Country-Name") ?? undefined;
			}
			if (
				config.all ||
				config.location === true ||
				locationConfig?.countryRegion
			) {
				viewerInfo.countryRegion =
					headers.get("CloudFront-Viewer-Country-Region") ?? undefined;
			}
			if (
				config.all ||
				config.location === true ||
				locationConfig?.countryRegionName
			) {
				viewerInfo.countryRegionName =
					headers.get("CloudFront-Viewer-Country-Region-Name") ?? undefined;
			}
			if (config.all || config.location === true || locationConfig?.latitude) {
				viewerInfo.latitude =
					headers.get("CloudFront-Viewer-Latitude") ?? undefined;
			}
			if (config.all || config.location === true || locationConfig?.longitude) {
				viewerInfo.longitude =
					headers.get("CloudFront-Viewer-Longitude") ?? undefined;
			}
			if (config.all || config.location === true || locationConfig?.metroCode) {
				viewerInfo.metroCode =
					headers.get("CloudFront-Viewer-Metro-Code") ?? undefined;
			}
			if (
				config.all ||
				config.location === true ||
				locationConfig?.postalCode
			) {
				viewerInfo.postalCode =
					headers.get("CloudFront-Viewer-Postal-Code") ?? undefined;
			}
			if (config.all || config.location === true || locationConfig?.timeZone) {
				viewerInfo.timeZone =
					headers.get("CloudFront-Viewer-Time-Zone") ?? undefined;
			}
		}

		if (config.all || config.protocol) {
			const protocolConfig = isConfigEnabled(config.protocol)
				? config.protocol
				: undefined;

			if (config.all || config.protocol === true || protocolConfig?.protocol) {
				viewerInfo.protocol =
					headers.get("CloudFront-Forwarded-Proto") ?? undefined;
			}
			if (
				config.all ||
				config.protocol === true ||
				protocolConfig?.httpVersion
			) {
				viewerInfo.httpVersion =
					headers.get("CloudFront-Viewer-Http-Version") ?? undefined;
			}
		}

		if (config.all || config.deviceType) {
			const deviceConfig = isConfigEnabled(config.deviceType)
				? config.deviceType
				: undefined;

			if (config.all || config.deviceType === true || deviceConfig?.android) {
				viewerInfo.isAndroidViewer = toBooleanOrUndefined(
					headers.get("CloudFront-Is-Android-Viewer"),
				);
			}
			if (config.all || config.deviceType === true || deviceConfig?.desktop) {
				viewerInfo.isDesktopViewer = toBooleanOrUndefined(
					headers.get("CloudFront-Is-Desktop-Viewer"),
				);
			}
			if (config.all || config.deviceType === true || deviceConfig?.ios) {
				viewerInfo.isIosViewer = toBooleanOrUndefined(
					headers.get("CloudFront-Is-IOS-Viewer"),
				);
			}
			if (config.all || config.deviceType === true || deviceConfig?.mobile) {
				viewerInfo.isMobileViewer = toBooleanOrUndefined(
					headers.get("CloudFront-Is-Mobile-Viewer"),
				);
			}
			if (config.all || config.deviceType === true || deviceConfig?.smartTv) {
				viewerInfo.isSmartTvViewer = toBooleanOrUndefined(
					headers.get("CloudFront-Is-SmartTV-Viewer"),
				);
			}
			if (config.all || config.deviceType === true || deviceConfig?.tablet) {
				viewerInfo.isTabletViewer = toBooleanOrUndefined(
					headers.get("CloudFront-Is-Tablet-Viewer"),
				);
			}
		}

		c.set("cloudFrontViewer", viewerInfo);
		await next();
	};
};
