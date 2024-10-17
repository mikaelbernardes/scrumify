"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@UI/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@UI/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signinSchema, type SigninTypeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@UI/input";
import { Button } from "@UI/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Icon from "@/public/icon.svg";

export default function SignIn() {
	const form = useForm<SigninTypeSchema>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { push } = useRouter();

	const [isPending, setIsPending] = useState<boolean>(false);

	const onSubmit = async (data: SigninTypeSchema) => {
		const result = await signIn("credentials", {
			username: data.username,
			password: data.password,
			redirect: false,
		});

		if (result?.error) {
			setIsPending(false);
			return toast.error("Credenciais inválidas!");
		}

		setIsPending(false);
		if (result?.ok) {
			push("/dashboard");
		}
	};

	return (
		<div className="w-screen h-screen items-center justify-center gap-8 flex flex-col ">
			<div className="flex items-center gap-4 w-fit h-fit">
				<Image
					src={Icon}
					alt="icon"
					className="w-12 h-12"
				/>
				<h1 className="text-3xl text-muted-foreground">Scrumify</h1>
			</div>
			<div className="w-full h-fit flex items-center justify-center px-10">
				<Card className="w-full max-w-96">
					<CardHeader>
						<CardTitle className="text-2xl">Entrar</CardTitle>
						<CardDescription>Acesse sua conta</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full flex flex-col gap-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Usuário</FormLabel>
											<FormControl>
												<Input
													placeholder="Digite seu nome de usuário"
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
													placeholder="Digite sua senha"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									disabled={isPending}>
									Entrar
								</Button>
								<div className="w-full flex items-center justify-center">
									<Link
										href="/forgot-password"
										className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
										Esqueceu a senha?
									</Link>
								</div>
								<div className="w-full h-fit flex items-center gap-4">
									<div className="w-full bg-muted-foreground/20 h-[0.3px]" />
									<p className="text-sm text-muted-foreground">OU</p>
									<div className="w-full bg-muted-foreground/20 h-[0.1px]" />
								</div>
								<Button
									type="button"
									variant="outline"
									disabled={isPending}
									onClick={() => push("/signup")}>
									Cadastrar
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
