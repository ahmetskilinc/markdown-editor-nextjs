"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import View from "./View";
import Edit from "./Edit";
import type { UserProfile as UserProfileType } from "@/types/UserProfile";
import { createClient } from "@/app/utils/client";

type Props = {
	user: UserProfileType;
	edit: boolean;
};

const UserProfile = ({ user, edit }: Props) => {
	const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>("");
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		const getUserAvatarUrl = async () => {
			if (user && user.avatar_id) {
				const { data } = supabase.storage.from("avatars").getPublicUrl(user.avatar_id);
				setUserAvatarUrl(data.publicUrl);
			}
		};

		if (user && user.avatar_id) {
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

	return edit ? <Edit user={user} /> : <View user={user} userAvatar={userAvatarUrl} />;
};

export default UserProfile;
