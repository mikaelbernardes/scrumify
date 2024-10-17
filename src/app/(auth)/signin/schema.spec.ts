import { signinSchema } from "./schema";

describe("signinSchema", () => {
	it("must validate a valid object", () => {
		const validData = {
			username: "usuario_teste",
			password: "senha_teste",
		};

		expect(() => signinSchema.parse(validData)).not.toThrow();
	});

	it("should fail when username is empty", () => {
		const invalidData = {
			username: "",
			password: "senha_teste",
		};

		expect(() => signinSchema.parse(invalidData)).toThrow("Campo obrigatório");
	});

	it("should fail when password is empty", () => {
		const invalidData = {
			username: "usuario_teste",
			password: "",
		};

		expect(() => signinSchema.parse(invalidData)).toThrow("Campo obrigatório");
	});
});
