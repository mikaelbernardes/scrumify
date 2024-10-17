import { z } from "zod";

export const signinSchema = z.object({
	username: z.string().min(1, "Campo obrigatório"),
	password: z.string().min(1, "Campo obrigatório"),
});

export type SigninTypeSchema = z.infer<typeof signinSchema>;
