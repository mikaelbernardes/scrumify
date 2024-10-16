import { prismaInstance } from "@/lib/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { refreshAccessToken } from "./refresh-access-token";
import type { $Enums } from "@prisma/client";

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: $Enums.Role;
		accessTokenExpires: number;
		refreshToken: string;
	}
}

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			role: $Enums.Role;
		};
		accessTokenExpires: number;
	}

	interface User {
		id: string;
		role: $Enums.Role;
		refreshToken: string;
	}
}

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "username",
					type: "text",
				},
				password: {
					label: "password",
					type: "password",
				},
			},

			async authorize(credentials) {
				if (!(credentials?.username && credentials?.password)) {
					return null;
				}

				const user = await prismaInstance.user.findFirst({
					where: {
						username: credentials?.username,
					},
				});

				if (!user) {
					return null;
				}

				const isValid = await argon2.verify(user.password, credentials?.password);

				if (!isValid) {
					return null;
				}

				const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
					expiresIn: "30d",
				});

				await prismaInstance.user.update({
					where: { id: user.id },
					data: { refreshToken },
				});

				return {
					id: String(user.id),
					role: user.role,
					refreshToken,
				};
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
				token.refreshToken = user.refreshToken;
			}

			if (Date.now() < token.accessTokenExpires) return token;

			return refreshAccessToken(token);
		},
		session({ session, token }) {
			session.user = {
				id: token.id,
				role: token.role,
			};
			session.accessTokenExpires = token.accessTokenExpires;

			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
