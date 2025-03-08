# hono-cloudfront

[![NPM Version](https://img.shields.io/npm/v/hono-cloudfront)](https://npmjs.com/package/hono-cloudfront)

A Hono middleware for extracting CloudFront viewer information from request headers when using AWS Lambda@Edge or Lambda Function URLs behind CloudFront.

## Features

- 🎯 **Selective Header Extraction**: Configure exactly which headers you want to extract
- 🔒 **Type-Safe**: Full TypeScript support with type inference based on your configuration
- 🚀 **Zero Dependencies**: Only requires Hono as a peer dependency
- 📦 **Lightweight**: Small bundle size and efficient header processing
- ✅ **Well Tested**: 100% test coverage with comprehensive test suite

## Installation

```bash
# npm
npm install hono-cloudfront

# pnpm
pnpm add hono-cloudfront

# yarn
yarn add hono-cloudfront
```

## Quick Start

```typescript
import { Hono } from 'hono';
import { cloudFrontViewer } from 'hono-cloudfront';

const app = new Hono();

// Extract all available headers
app.use(cloudFrontViewer());

app.get('/', (c) => {
  const viewer = c.get('cloudFrontViewer');
  // viewer has all properties typed
  return c.json({
    country: viewer.country,
    city: viewer.city,
    isDesktopViewer: viewer.isDesktopViewer
  });
});
```

## Configuration

The middleware can be configured to extract only the headers you need:

```typescript
import { cloudFrontViewer } from 'hono-cloudfront';

// Extract all headers (default)
app.use(cloudFrontViewer({ all: true }));

// Extract all headers from specific categories
app.use(cloudFrontViewer({
  location: true,    // All location headers
  deviceType: true,  // All device type headers
  network: true,     // All network headers
  protocol: true     // All protocol headers
}));

// Extract specific headers from each category
app.use(cloudFrontViewer({
  location: {
    country: true,
    city: true
  },
  deviceType: {
    mobile: true,
    tablet: true
  }
}));
```

### Available Headers by Category

#### Location Headers
- `country`: Two-letter country code (ISO 3166-1 alpha-2)
- `city`: City name
- `countryName`: Full country name
- `countryRegion`: Region code
- `countryRegionName`: Full region name
- `latitude`: Approximate latitude
- `longitude`: Approximate longitude
- `metroCode`: Metro code (US only)
- `postalCode`: Postal code
- `timeZone`: Time zone in IANA format

#### Device Type Headers
- `android`: Android device detection
- `desktop`: Desktop browser detection
- `ios`: iOS device detection
- `mobile`: Mobile device detection
- `smartTv`: Smart TV detection
- `tablet`: Tablet detection

#### Network Headers
- `address`: IP address and port
- `asn`: Autonomous system number

#### Protocol Headers
- `protocol`: Protocol used (e.g., "https")
- `httpVersion`: HTTP version

## Type Safety

The middleware provides type inference based on your configuration. This means you'll get precise TypeScript types for the extracted headers:

### Basic Type Inference

```typescript
import { Hono } from 'hono';
import { cloudFrontViewer } from 'hono-cloudfront';

// To get proper type inference, define your configuration
const config = {
  location: {
    country: true,
    city: true
  },
  deviceType: {
    mobile: true
  }
} as const; // Important: use 'as const'

const app = new Hono();
app.use(cloudFrontViewer(config));

// TypeScript now knows exactly which properties are available
app.get('/', (c) => {
  const viewer = c.get('cloudFrontViewer');
  
  viewer.country;    // string | undefined ✅
  viewer.city;       // string | undefined ✅
  viewer.isMobileViewer; // boolean | undefined ✅
  viewer.isTabletViewer; // Property does not exist ❌
});
```

### Extending Hono's Context Type

When using a specific configuration, you'll want to ensure type safety across your application. Here's how to properly type your CloudFront viewer configuration:

```typescript
import type { Context } from 'hono';
import type { CloudFrontViewerConfig, InferCloudFrontViewerInfo } from 'hono-cloudfront';

// 1. Define your configuration
const config = {
  location: {
    country: true,
    city: true,
    timeZone: true
  },
  deviceType: {
    mobile: true,
    tablet: true
  }
} as const;

// 2. Create a type from your configuration
type MyConfig = typeof config;

// 3. Extend Hono's context type with your configuration
declare module 'hono' {
  interface ContextVariableMap {
    cloudFrontViewer: InferCloudFrontViewerInfo<MyConfig>;
  }
}

// Now you have type safety everywhere in your application
const app = new Hono();
app.use(cloudFrontViewer(config));

// Example route handler with proper typing
app.get('/', (c) => {
  const viewer = c.get('cloudFrontViewer');
  
  // TypeScript knows exactly what's available
  return c.json({
    location: {
      city: viewer.city,           // ✅ string | undefined
      country: viewer.country,     // ✅ string | undefined
      timezone: viewer.timeZone    // ✅ string | undefined
    },
    device: {
      isMobile: viewer.isMobileViewer,  // ✅ boolean | undefined
      isTablet: viewer.isTabletViewer   // ✅ boolean | undefined
    },
    // @ts-expect-error - Property does not exist
    isDesktop: viewer.isDesktopViewer   // ❌ Not included in config
  });
});

// Type safety in other functions
const getLocation = (c: Context) => {
  const viewer = c.get('cloudFrontViewer');
  // Full type safety based on your config
  return {
    city: viewer.city,
    country: viewer.country
  };
};
```

### Helper Type for Multiple Configurations

If you're using different configurations in different parts of your application, you can create a helper type to manage context types:

```typescript
// types/cloudfront.ts
import type { CloudFrontViewerConfig, InferCloudFrontViewerInfo } from 'hono-cloudfront';

// Helper type to create a typed context
export type TypedContext<T extends CloudFrontViewerConfig> = {
  cloudFrontViewer: InferCloudFrontViewerInfo<T>;
};

// Example configurations
export const geoConfig = {
  location: {
    country: true,
    city: true,
    latitude: true,
    longitude: true
  }
} as const;

export const deviceConfig = {
  deviceType: {
    mobile: true,
    tablet: true,
    desktop: true
  }
} as const;

// Type your routes based on configuration
app.get('/geo', (c) => {
  type GeoContext = TypedContext<typeof geoConfig>;
  const viewer = c.get<keyof GeoContext>('cloudFrontViewer');
  
  return c.json({
    position: {
      lat: viewer.latitude,   // ✅ string | undefined
      lng: viewer.longitude   // ✅ string | undefined
    }
  });
});

app.get('/device', (c) => {
  type DeviceContext = TypedContext<typeof deviceConfig>;
  const viewer = c.get<keyof DeviceContext>('cloudFrontViewer');
  
  return c.json({
    device: {
      isMobile: viewer.isMobileViewer,   // ✅ boolean | undefined
      isTablet: viewer.isTabletViewer,   // ✅ boolean | undefined
      isDesktop: viewer.isDesktopViewer  // ✅ boolean | undefined
    }
  });
});

// You can also combine configurations
type CombinedContext = TypedContext<typeof geoConfig & typeof deviceConfig>;

// Create type-safe middleware
const requireLocation = (c: Context) => {
  const viewer = c.get('cloudFrontViewer');
  if (!viewer.country || !viewer.city) {
    return c.json({ error: 'Location required' }, 400);
  }
  return c.next();
};
```

This approach provides:
1. Type-safe access to CloudFront viewer information based on your configuration
2. Ability to use different configurations in different parts of your application
3. Type checking for middleware and route handlers
4. IDE autocompletion for available properties
5. Compile-time errors when accessing undefined properties

## CloudFront Configuration

To use this middleware, you need to configure CloudFront to forward the required headers to your Lambda function. Here's an example of the required headers for each category:

### Origin Request Policy

```json
{
  "HeadersConfig": {
    "HeaderBehavior": "whitelist",
    "Headers": {
      "Items": [
        "CloudFront-Viewer-Address",
        "CloudFront-Viewer-ASN",
        "CloudFront-Viewer-Country",
        "CloudFront-Viewer-City",
        "CloudFront-Viewer-Country-Name",
        "CloudFront-Viewer-Country-Region",
        "CloudFront-Viewer-Country-Region-Name",
        "CloudFront-Viewer-Latitude",
        "CloudFront-Viewer-Longitude",
        "CloudFront-Viewer-Metro-Code",
        "CloudFront-Viewer-Postal-Code",
        "CloudFront-Viewer-Time-Zone",
        "CloudFront-Forwarded-Proto",
        "CloudFront-Viewer-Http-Version",
        "CloudFront-Is-Android-Viewer",
        "CloudFront-Is-Desktop-Viewer",
        "CloudFront-Is-IOS-Viewer",
        "CloudFront-Is-Mobile-Viewer",
        "CloudFront-Is-SmartTV-Viewer",
        "CloudFront-Is-Tablet-Viewer"
      ]
    }
  }
}
```

## License

MIT
