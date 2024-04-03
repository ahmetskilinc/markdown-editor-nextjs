import { UserProfile } from "../../../../types/UserProfile";
import moment from "moment";
import React from "react";

type Props = {
	user: UserProfile;
	userAvatar?: string | null;
};

const View = ({ user, userAvatar }: Props) => {
	function getAge(dateString: string) {
		return moment().diff(dateString, "years", false);
	}

	function getDate(dateString: string) {
		return moment(dateString).format("Do MMMM YYYY");
	}

	return (
		<div className="border-t border-gray-100">
			<dl className="divide-y divide-gray-100">
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{user.username}
					</dd>
				</div>
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{user.first_name} {user.last_name}
					</dd>
				</div>
				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt className="text-sm font-medium leading-6 text-gray-900">Date of birth</dt>
					<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{getDate(user.dob)} ({getAge(user.dob)} years old)
					</dd>
				</div>
			</dl>
		</div>
	);
};

export default View;
