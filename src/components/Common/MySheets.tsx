import { createClient } from "@/app/utils/server";
import { SheetCard } from "@/components/Sheets";
import { NewSheet } from "./NewSheetButton";

const MySheets = async () => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase
		.from("sheets")
		.select("*")
		.match({ user_id: user?.id })
		.order("created_at", {
			ascending: true,
		});

	return data && data.length > 0 ? (
		<div>
			<ul
				role="list"
				className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			>
				{data.map((sheet) => (
					<SheetCard key={sheet.id} sheet={sheet} />
				))}
				<NewSheet />
			</ul>
		</div>
	) : (
		<div>
			<p className="w-full border border-black/30 bg-black/5 rounded-lg h-44 flex items-center justify-center">
				You have no sheets saved.
			</p>
		</div>
	);
};

export default MySheets;
