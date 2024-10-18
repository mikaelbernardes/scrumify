import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const accountSignupSchema = z
	.object({
		name: z
			.string()
			.min(1, "Campo obrigatório")
			.refine((value) => /^[a-zA-Z\s]+$/.test(value), {
				message: "O nome não deve conter números ou caracteres especiais",
			}),
		username: z
			.string()
			.min(1, "Campo obrigatório")
			.refine((value) => !/\s/.test(value), {
				message: "O nome de usuário não deve conter espaços",
			}),
		email: z.string().email("E-mail incorreto"),
		password: z
			.string()
			.min(1, "Campo obrigatório")
			.regex(
				passwordRegex,
				"A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial",
			),
		confirmPassword: z
			.string()
			.min(1, "Campo obrigatório")
			.regex(
				passwordRegex,
				"A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial",
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas devem ser iguais",
		path: ["confirmPassword"],
	});

const zipCodeRegex = /^\d{5}-\d{3}$/;

export const addressSignupSchema = z.object({
	zipCode: z.string().min(1, "Campo obrigatório").regex(zipCodeRegex, "Formato de CEP inválido"),
	country: z
		.string()
		.min(1, "Campo obrigatório")
		.refine((value) => /^[a-zA-Z\s]+$/.test(value), {
			message: "O nome do país não deve conter números ou caracteres especiais",
		}),
	state: z.string().min(1, "Campo obrigatório"),
	city: z.string().min(1, "Campo obrigatório"),
	neighborhood: z
		.string()
		.min(1, "Campo obrigatório")
		.refine((value) => /^[a-zA-Z\s]+$/.test(value), {
			message: "O nome do bairro não deve conter números ou caracteres especiais",
		}),
	street: z
		.string()
		.min(1, "Campo obrigatório")
		.refine((value) => /^[a-zA-Z\s]+$/.test(value), {
			message: "O nome da rua não deve conter números ou caracteres especiais",
		}),
	streetNumber: z
		.string()
		.min(1, "Campo obrigatório")
		.refine((value) => /^\d+$/.test(value), {
			message: "Só número",
		}),
	complement: z.string().optional(),
});

export const signupSchema = z.object({
	accountSignupSchema,
	addressSignupSchema,
});

export type AccountSignupTypeSchema = z.infer<typeof accountSignupSchema>;
export type AddressSignupTypeSchema = z.infer<typeof addressSignupSchema>;
export type SignupTypeSchema = z.infer<typeof signupSchema>;
