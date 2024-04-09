"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import View from "./View";
import Edit from "./Edit";
import { createClient } from "@/app/utils/client";
import { User } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase.types";

type Props = {
	userProfile: Database["public"]["Tables"]["users"]["Row"];
	edit: boolean;
	user: User;
};

const UserProfile = ({ userProfile, user, edit }: Props) => {
	const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>("");
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		const getUserAvatarUrl = async () => {
			if (userProfile && userProfile.avatar_id) {
				const { data } = supabase.storage
					.from("avatars")
					.getPublicUrl(userProfile.avatar_id);
				setUserAvatarUrl(data.publicUrl);
			}
		};

		if (userProfile && userProfile.avatar_id) {
			getUserAvatarUrl();
		}
	});

	useEffect(() => {
		const channel = supabase
			.channel("realtime profile")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "users",
				},
				() => {
					router.refresh();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, router]);

	return edit ? (
		<Edit userProfile={userProfile} user={user} />
	) : (
		<View userProfile={userProfile} user={user} userAvatar={userAvatarUrl} />
	);
};

export default UserProfile;
