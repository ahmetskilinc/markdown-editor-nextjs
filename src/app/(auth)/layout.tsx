import "@/styles/globals.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PlainHeader from "../../components/Common/PlainHeader";
import AuthProvider from "../../providers/AuthProvider";

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<html lang="en">
			<head />
			<body>
				<AuthProvider accessToken={session?.access_token}>
					<PlainHeader />
					<main className="pt-16">{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}
