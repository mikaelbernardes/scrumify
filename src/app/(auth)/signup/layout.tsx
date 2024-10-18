"use client";
import Icon from "@/public/icon.svg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@UI/card";
import { Form } from "@UI/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import type React from "react";
import { useForm } from "react-hook-form";
import { type SignupTypeSchema, signupSchema } from "./schema";

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
	const form = useForm<SignupTypeSchema>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			accountSignupSchema: {
				name: "",
				email: "",
				username: "",
				password: "",
				confirmPassword: "",
			},
			addressSignupSchema: {
				city: "",
				complement: "",
				country: "",
				neighborhood: "",
				state: "",
				street: "",
				streetNumber: "",
				zipCode: "",
			},
		},
	});

	return (
		<div className="w-full py-8 min-h-screen items-center justify-center gap-8 flex flex-col ">
			<div className="items-center gap-4 w-fit h-fit 2xl:flex hidden">
				<Image
					src={Icon}
					alt="icon"
					className="w-12 h-12"
				/>
				<h1 className="text-3xl text-muted-foreground">Scrumify</h1>
			</div>
			<div className="w-full h-fit flex items-center justify-center px-10">
				<Card className="w-full max-w-96 h-fit">
					<CardHeader>
						<CardTitle className="text-2xl">Cadastrar</CardTitle>
						<CardDescription>Crie sua conta</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>{children}</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
