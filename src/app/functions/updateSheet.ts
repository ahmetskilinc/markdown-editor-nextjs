"use server";

import { createClient } from "../utils/server";

export const updateSupabaseField = async (newValue: string, id: string) => {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("sheets")
		.update({ content: newValue })
		.match({ id: id });

	if (error) {
		console.error("Error updating field:", error);
		return false;
	} else {
		return true;
	}
};
