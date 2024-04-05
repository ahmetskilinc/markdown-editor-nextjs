import { createClient } from "@/app/utils/server";
import { Sheets } from "@/components/Sheets";
import { redirect } from "next/navigation";

const Page = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/sign-in");

	const { data, error } = await supabase.from("sheets").select("*").match({ user_id: user?.id });

	return (
		<main className="pt-16">
			<div className="mx-auto max-w-7xl p-6 lg:px-8">
				{data && data.length > 0 ? (
					<Sheets sheets={data} />
				) : (
					<div>
						<p>No sheets</p>
					</div>
				)}
			</div>
		</main>
	);
};

export default Page;
