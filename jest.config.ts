import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	preset: "ts-jest",
	modulePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/src/components/ui/"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/components/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
