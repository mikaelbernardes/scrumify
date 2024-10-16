"use client";
import { Button } from "@UI/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@UI/form";
import { Input } from "@UI/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";
import {
	type AddressSignupTypeSchema,
	type SignupTypeSchema,
	addressSignupSchema,
} from "../schema";

export default function Address() {
	const formContext = useFormContext<SignupTypeSchema>();
	const form = useForm<AddressSignupTypeSchema>({
		resolver: zodResolver(addressSignupSchema),
		defaultValues: formContext.getValues("addressSignupSchema"),
	});

	const { push } = useRouter();

	const onSubmit = async (data: AddressSignupTypeSchema) => {
		formContext.setValue("addressSignupSchema", data);
		push("/signin");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-4">
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="zipCode"
						render={({ field }) => (
							<FormItem className="w-full max-w-24">
								<FormLabel>CEP</FormLabel>
								<FormControl>
									<Input
										placeholder="00000-000"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>País</FormLabel>
								<FormControl>
									<Input
										placeholder="Ex: Brasil"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem className="w-full max-w-20">
								<FormLabel>UF</FormLabel>
								<FormControl>
									<Input
										placeholder="Ex: SP"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Cidade</FormLabel>
								<FormControl>
									<Input
										placeholder="Ex: São Paulo"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="neighborhood"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bairro</FormLabel>
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
				<FormField
					control={form.control}
					name="street"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rua</FormLabel>
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
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="streetNumber"
						render={({ field }) => (
							<FormItem className="w-full max-w-16">
								<FormLabel>N°</FormLabel>
								<FormControl>
									<Input
										placeholder="0000"
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
						name="complement"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Complemento</FormLabel>
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
				</div>
				<Button type="submit">Cadastrar</Button>
			</form>
		</Form>
	);
}
