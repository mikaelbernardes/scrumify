import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "node",
	preset: "ts-jest",
	modulePathIgnorePatterns: ["<rootDir>/.next/"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/components/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
