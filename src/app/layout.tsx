import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["300"],
	style: "normal",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Scrumify",
	description: "Scrumify: Simplifying Teams, Accelerating Success!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`}>{children}</body>
		</html>
	);
}
