import { z } from "zod";

export const accountSignupSchema = z.object({
	name: z.string().min(1, "Campo obrigatório"),
	username: z.string().min(1, "Campo obrigatório"),
	email: z.string().email(),
	password: z.string().min(1, "Campo obrigatório"),
	confirmPassword: z.string().min(1, "Campo obrigatório"),
});

export const addressSignupSchema = z.object({
	zipCode: z.string().min(1, "Campo obrigatório"),
	country: z.string().min(1, "Campo obrigatório"),
	state: z.string().min(1, "Campo obrigatório"),
	city: z.string().min(1, "Campo obrigatório"),
	neighborhood: z.string().min(1, "Campo obrigatório"),
	street: z.string().min(1, "Campo obrigatório"),
	streetNumber: z.string().min(1, "Campo obrigatório"),
	complement: z.string().min(1, "Campo obrigatório"),
});

export const signupSchema = z.object({
	accountSignupSchema,
	addressSignupSchema,
});

export type AccountSignupTypeSchema = z.infer<typeof accountSignupSchema>;
export type AddressSignupTypeSchema = z.infer<typeof addressSignupSchema>;
export type SignupTypeSchema = z.infer<typeof signupSchema>;
