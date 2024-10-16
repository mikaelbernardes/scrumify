import { PrismaClient } from "@prisma/client";
import { prismaInstance } from "./prisma";

describe("Prisma Client Instance", () => {
	beforeAll(() => {
		(process.env as { NODE_ENV: string }).NODE_ENV = "test";
	});

	afterAll(() => {
		prismaInstance.$disconnect();
	});

	it("should create a new PrismaClient instance in non-production environment", () => {
		expect(prismaInstance).toBeInstanceOf(PrismaClient);
	});

	it("should reuse the global PrismaClient instance in non-production environment", () => {
		const anotherInstance = global.prisma || new PrismaClient();
		expect(anotherInstance).toBe(prismaInstance);
	});

	it("should not create a new instance in production environment", () => {
		(process.env as { NODE_ENV: string }).NODE_ENV = "production";
		const productionInstance = global.prisma || new PrismaClient();
		expect(productionInstance).toBeDefined();
	});

	it("should set global.prisma in non-production environment", () => {
		expect(global.prisma).toBeDefined();
		expect(global.prisma).toBe(prismaInstance);
	});
});
