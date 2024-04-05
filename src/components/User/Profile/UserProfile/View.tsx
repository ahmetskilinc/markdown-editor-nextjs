import { User } from "@supabase/supabase-js";
import { UserProfile } from "../../../../types/UserProfile";
import moment from "moment";
import React from "react";

type Props = {
	userProfile: UserProfile;
	user: User;
	userAvatar?: string | null;
};

const View = ({ userProfile, userAvatar, user }: Props) => {
	function getAge(dateString: string) {
		return moment().diff(dateString, "years", false);
	}

	function getDate(dateString: string) {
		return moment(dateString).format("Do MMMM YYYY");
	}

	return (
		<div className="">
			<dl className="divide-y divide-gray-100">
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Avatar</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						<div className="aspect-square h-16 bg-red-400"></div>
					</dd>
				</div>
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{userProfile.username}
					</dd>
				</div>
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{user.email} ({user.email_confirmed_at ? "verified" : "not verified"})
					</dd>
				</div>
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{userProfile.first_name} {userProfile.last_name}
					</dd>
				</div>
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Date of birth</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{getDate(userProfile.dob)} ({getAge(userProfile.dob)} years old)
					</dd>
				</div>
			</dl>
		</div>
	);
};

export default View;
