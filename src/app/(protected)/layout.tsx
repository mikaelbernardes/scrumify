import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const { status } = useSession();
	const { push } = useRouter();

	if (status === "unauthenticated") return push("/signin");

	return <>{children}</>;
}
