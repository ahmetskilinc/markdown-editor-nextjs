import { createClient } from "@/app/utils/server";
import PlainHeader from "@/components/Common/PlainHeader";

export const metadata = {
	title: "Markdown",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase.from("users").select("*").match({ user_id: user?.id });

	return (
		<>
			<PlainHeader />
			{children}
		</>
	);
}
