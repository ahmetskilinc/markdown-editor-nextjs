import Header from "@/components/Common/Header";
import { createClient } from "@/app/utils/server";

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
			<Header user={data ? data[0] : undefined} wide userSignedIn={!!user} />
			{children}
		</>
	);
}
