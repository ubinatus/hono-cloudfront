import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.ts"],
			exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
			all: true,
			thresholds: {
				lines: 90,
				functions: 90,
				branches: 90,
				statements: 90,
			},
			reportsDirectory: "./coverage",
		},
		environment: "node",
		include: ["src/**/*.{test,spec}.ts"],
		reporters: ["default", "html"],
		globals: true,
	},
});
