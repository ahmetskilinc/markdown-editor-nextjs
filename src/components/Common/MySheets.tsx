import { createClient } from "@/app/utils/server";
import { Sheets } from "@/components/Sheets";
import { redirect } from "next/navigation";

const MySheets = async () => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase.from("sheets").select("*").match({ user_id: user?.id });

	return data && data.length > 0 ? (
		<Sheets sheets={data} />
	) : (
		<div>
			<p>No sheets</p>
		</div>
	);
};

export default MySheets;
