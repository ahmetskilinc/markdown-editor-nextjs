import { createClient } from "@/app/utils/server";
import MySheets from "@/components/Common/MySheets";
import { redirect } from "next/navigation";

const Page = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/sign-in");

	return (
		<main className="pt-16">
			<div className="mx-auto max-w-7xl p-6 lg:px-8">
				<p>Make a new sheet</p>
			</div>
		</main>
	);
};

export default Page;
