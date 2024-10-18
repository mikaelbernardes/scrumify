"use client";
import { Button } from "@UI/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@UI/form";
import { Input } from "@UI/input";
import { useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import {
	accountSignupSchema,
	type AccountSignupTypeSchema,
	type SignupTypeSchema,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Account() {
	const formContext = useFormContext<SignupTypeSchema>();
	const form = useForm<AccountSignupTypeSchema>({
		resolver: zodResolver(accountSignupSchema),
		defaultValues: formContext.getValues("accountSignupSchema"),
	});

	const { push } = useRouter();

	console.log(form.formState.errors);

	const onSubmit = (data: AccountSignupTypeSchema) => {
		formContext.setValue("accountSignupSchema", data);
		push("/signup/address");
	};

	return (
		<Form {...form}>
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
		</Form>
	);
}
