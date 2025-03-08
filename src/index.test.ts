import { Hono } from "hono";
import { describe, expect, it } from "vitest";

import { cloudFrontViewer } from "./index";

describe("cloudFrontViewer middleware", () => {
	const createTestHeaders = () =>
		new Headers({
			"CloudFront-Viewer-Address": "198.51.100.10:46532",
			"CloudFront-Viewer-ASN": "12345",
			"CloudFront-Viewer-Country": "PE",
			"CloudFront-Viewer-City": "Lima",
			"CloudFront-Viewer-Country-Name": "Peru",
			"CloudFront-Viewer-Country-Region": "LMA",
			"CloudFront-Viewer-Country-Region-Name": "Lima Province",
			"CloudFront-Viewer-Latitude": "-12.04320",
			"CloudFront-Viewer-Longitude": "-77.02820",
			"CloudFront-Viewer-Metro-Code": "819",
			"CloudFront-Viewer-Postal-Code": "98101",
			"CloudFront-Viewer-Time-Zone": "America/Lima",
			"CloudFront-Forwarded-Proto": "https",
			"CloudFront-Is-Android-Viewer": "false",
			"CloudFront-Is-Desktop-Viewer": "true",
			"CloudFront-Is-IOS-Viewer": "false",
			"CloudFront-Is-Mobile-Viewer": "false",
			"CloudFront-Is-SmartTV-Viewer": "false",
			"CloudFront-Is-Tablet-Viewer": "false",
			"CloudFront-Viewer-Http-Version": "2.0",
		});

	it("should extract all CloudFront viewer information by default", async () => {
		const app = new Hono();
		app.use(cloudFrontViewer());
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			address: "198.51.100.10:46532",
			asn: "12345",
			country: "PE",
			city: "Lima",
			countryName: "Peru",
			countryRegion: "LMA",
			countryRegionName: "Lima Province",
			latitude: "-12.04320",
			longitude: "-77.02820",
			metroCode: "819",
			postalCode: "98101",
			timeZone: "America/Lima",
			protocol: "https",
			isAndroidViewer: false,
			isDesktopViewer: true,
			isIosViewer: false,
			isMobileViewer: false,
			isSmartTvViewer: false,
			isTabletViewer: false,
			httpVersion: "2.0",
		});
	});

	it("should handle missing headers gracefully", async () => {
		const app = new Hono();
		app.use(cloudFrontViewer());
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/");
		const data = await res.json();

		expect(data).toEqual({});
	});

	it("should extract only location headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				location: true,
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			country: "PE",
			city: "Lima",
			countryName: "Peru",
			countryRegion: "LMA",
			countryRegionName: "Lima Province",
			latitude: "-12.04320",
			longitude: "-77.02820",
			metroCode: "819",
			postalCode: "98101",
			timeZone: "America/Lima",
		});
	});

	it("should extract only specific location headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				location: {
					country: true,
					city: true,
				},
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			country: "PE",
			city: "Lima",
		});
	});

	it("should extract only device type headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				deviceType: true,
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			isAndroidViewer: false,
			isDesktopViewer: true,
			isIosViewer: false,
			isMobileViewer: false,
			isSmartTvViewer: false,
			isTabletViewer: false,
		});
	});

	it("should extract only specific device type headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				deviceType: {
					mobile: true,
					tablet: true,
				},
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			isMobileViewer: false,
			isTabletViewer: false,
		});
	});

	it("should extract only network headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				network: true,
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			address: "198.51.100.10:46532",
			asn: "12345",
		});
	});

	it("should extract only specific network headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				network: {
					address: true,
				},
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			address: "198.51.100.10:46532",
		});
	});

	it("should extract only protocol headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				protocol: true,
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			protocol: "https",
			httpVersion: "2.0",
		});
	});

	it("should extract only specific protocol headers when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				protocol: {
					protocol: true,
				},
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			protocol: "https",
		});
	});

	it("should extract multiple categories when configured", async () => {
		const app = new Hono();
		app.use(
			cloudFrontViewer({
				location: {
					country: true,
					city: true,
				},
				deviceType: {
					mobile: true,
					tablet: true,
				},
				network: {
					address: true,
				},
			}),
		);
		app.get("/", (c) => {
			const info = c.get("cloudFrontViewer");
			return c.json(info);
		});

		const res = await app.request("/", {
			headers: createTestHeaders(),
		});
		const data = await res.json();

		expect(data).toEqual({
			country: "PE",
			city: "Lima",
			isMobileViewer: false,
			isTabletViewer: false,
			address: "198.51.100.10:46532",
		});
	});
});
