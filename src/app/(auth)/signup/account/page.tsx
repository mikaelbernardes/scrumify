"use client";
import { Button } from "@UI/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@UI/form";
import { Input } from "@UI/input";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { signupSchema, type FirstSignupTypeSchema } from "../schema";
import { toast } from "sonner";

export default function Account() {
	const form = useFormContext<FirstSignupTypeSchema>();

	const { push } = useRouter();

	const onSubmit = async (data: FirstSignupTypeSchema) => {
		try {
			signupSchema.parse(data);
			push("/signup/address");
		} catch (error) {
			toast.error((error as unknown as Error).message);
		}
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="w-full flex flex-col gap-4">
			<FormField
				control={form.control}
				name="companyName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nome da Empresa</FormLabel>
						<FormControl>
							<Input
								placeholder="Cadastre o nome da sua empresa"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="username"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Usuário</FormLabel>
						<FormControl>
							<Input
								placeholder="Cadastre seu nome de usuário"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>E-mail</FormLabel>
						<FormControl>
							<Input
								placeholder="Insira seu principal e-mail"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Senha</FormLabel>
						<FormControl>
							<Input
								placeholder="Cadastre sua senha"
								type="password"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="confirmPassword"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Confirmar senha</FormLabel>
						<FormControl>
							<Input
								placeholder="Confirme sua senha"
								type="password"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button type="submit">Avançar</Button>
			<div className="w-full h-fit flex items-center gap-4">
				<div className="w-full bg-muted-foreground/20 h-[0.3px]" />
				<p className="text-sm text-muted-foreground">OU</p>
				<div className="w-full bg-muted-foreground/20 h-[0.1px]" />
			</div>
			<Button
				type="button"
				variant="outline"
				onClick={() => push("/signin")}>
				Entrar
			</Button>
		</form>
	);
}
