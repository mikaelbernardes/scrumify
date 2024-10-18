import { z } from "zod";

export const firstSignupSchema = z.object({
	companyName: z.string().min(1, "Campo obrigatório"),
	username: z.string().min(1, "Campo obrigatório"),
	email: z.string().email(),
	password: z.string().min(1, "Campo obrigatório"),
	confirmPassword: z.string().min(1, "Campo obrigatório"),
});

export const signupSchema = z.object({
	firstSignupSchema,
});

export type FirstSignupTypeSchema = z.infer<typeof firstSignupSchema>;
export type SignupTypeSchema = z.infer<typeof signupSchema>;
