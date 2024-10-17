import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "./page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
/**
 * @jest-environment jsdom
 */
jest.mock("next-auth/react", () => ({
	signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
	toast: {
		error: jest.fn(),
	},
}));

describe("SignIn Component", () => {
	const push = jest.fn();

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({ push });
	});

	test("should render correctly", () => {
		render(<SignIn />);

		expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();

		expect(screen.getByPlaceholderText("Digite seu nome de usuário")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
		expect(screen.getByText("Esqueceu a senha?")).toBeInTheDocument();
	});

	it("must allow data entry into the form", () => {
		render(<SignIn />);

		const usernameInput = screen.getByPlaceholderText("Digite seu nome de usuário");
		const passwordInput = screen.getByPlaceholderText("Digite sua senha");

		fireEvent.change(usernameInput, { target: { value: "testuser" } });
		fireEvent.change(passwordInput, { target: { value: "testpassword" } });

		expect(usernameInput).toHaveValue("testuser");
		expect(passwordInput).toHaveValue("testpassword");
	});

	it("should show error message if credentials are wrong", async () => {
		(signIn as jest.Mock).mockResolvedValueOnce({ error: "Credenciais inválidas", ok: false });

		render(<SignIn />);

		fireEvent.change(screen.getByPlaceholderText("Digite seu nome de usuário"), {
			target: { value: "wronguser" },
		});
		fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), {
			target: { value: "wrongpassword" },
		});

		fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Credenciais inválidas!");
		});

		expect(signIn).toHaveBeenCalledWith("credentials", {
			username: "wronguser",
			password: "wrongpassword",
			redirect: false,
		});
	});

	it("should redirect to dashboard after successful login", async () => {
		(signIn as jest.Mock).mockResolvedValueOnce({ ok: true });

		render(<SignIn />);

		fireEvent.change(screen.getByPlaceholderText("Digite seu nome de usuário"), {
			target: { value: "validuser" },
		});
		fireEvent.change(screen.getByPlaceholderText("Digite sua senha"), {
			target: { value: "validpassword" },
		});

		fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

		await waitFor(() => {
			expect(push).toHaveBeenCalledWith("/dashboard");
		});
	});

	it("must navigate to the registration page by clicking 'Register'", () => {
		render(<SignIn />);

		fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

		expect(push).toHaveBeenCalledWith("/signup");
	});

	it("should render the 'Forgot your password?' link and allow navigation", () => {
		render(<SignIn />);

		const forgotPasswordLink = screen.getByText(/esqueceu a senha/i);
		expect(forgotPasswordLink).toBeInTheDocument();
		expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
	});
});
