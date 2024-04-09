"use client";

import React, { useState } from "react";
import UserProfile from "./UserProfile";
import { cn } from "../../../app/utils/cn";
import { User } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase.types";

type Props = {
	userProfile: Database["public"]["Tables"]["users"]["Row"];
	user: User;
};

const Tabs = ({
	tab,
	setTab,
	edit,
	setEdit,
}: {
	tab: string;
	setTab: React.Dispatch<
		React.SetStateAction<"aboutyou" | "experience" | "education" | "skills">
	>;
	edit: boolean;
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const tabs = [
		{ name: "About you", current: tab === "aboutyou" },
		{ name: "Experience", current: tab === "experience" },
		{ name: "Education", current: tab === "education" },
		{ name: "Skills", current: tab === "skills" },
	];

	return (
		<div className="w-full sm:w-60">
			<div className="flex items-center justify-betweens md:hidden mb-4 gap-4 mt-4">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<select
					id="tabs"
					name="tabs"
					onChange={(e) =>
						setTab(
							e.target.value.replace(/\s/g, "").toLocaleLowerCase() as
								| "aboutyou"
								| "experience"
								| "education"
								| "skills"
						)
					}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					defaultValue={tabs.find((tab) => tab.current)!.name}
				>
					{tabs.map((tab) => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
				<div className="flex flex-shrink space-x-2">
					{!edit ? (
						<button
							className="shadow rounded-md bg-indigo-600 py-2 px-6 text-sm font-normal text-white hover:bg-indigo-500 focus:outline focus:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => setEdit(!edit)}
						>
							Edit
						</button>
					) : (
						<button
							className="shadow rounded-md bg-red-600 py-2 px-6 text-sm font-normal text-white hover:bg-red-500 focus:outline focus:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
							onClick={() => setEdit(!edit)}
						>
							Cancel
						</button>
					)}
				</div>
			</div>
			<div className="hidden sm:block w-full items-center justify-between py-4">
				<div>
					<nav className="-mb-px block space-y-2" aria-label="Tabs">
						{tabs.map((tab) => (
							<div
								onClick={() =>
									setTab(
										tab.name.replace(/\s/g, "").toLocaleLowerCase() as
											| "aboutyou"
											| "experience"
											| "education"
											| "skills"
									)
								}
								key={tab.name}
								className={cn(
									tab.current
										? "bg-gray-200"
										: "border-transparent text-gray-500 hover:bg-gray-300 hover:text-gray-700",
									"cursor-pointer whitespace-nowrap border-b-2 py-2 px-3 text-sm font-medium rounded-lg"
								)}
								aria-current={tab.current ? "page" : undefined}
							>
								{tab.name}
							</div>
						))}
					</nav>
				</div>
				{/* <div className="space-x-2">
					{!edit ? (
						<button
							className="shadow rounded-md bg-indigo-600 px-4 py-1 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => setEdit(!edit)}
						>
							Edit
						</button>
					) : (
						<button
							className="shadow rounded-md bg-red-600 px-4 py-1 text-sm font-normal text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
							onClick={() => setEdit(!edit)}
						>
							Cancel
						</button>
					)}
				</div> */}
			</div>
		</div>
	);
};

const CurrentTab = ({
	tab,
	userProfile,
	user,
	edit,
}: {
	tab: string;
	userProfile: Database["public"]["Tables"]["users"]["Row"];
	user: User;
	edit: boolean;
}) => {
	return (
		<div className="w-full min-h-[calc(100vh-240px)] p-4 my-4 border border-gray-900/10 rounded-lg shadow">
			{tab === "aboutyou" ? (
				<UserProfile userProfile={userProfile} user={user} edit={edit} />
			) : tab === "experience" ? (
				<p>EXPERIENCE</p>
			) : tab === "education" ? (
				<p>EDUCATION</p>
			) : tab === "skills" ? (
				<p>SKILLS</p>
			) : null}
		</div>
	);
};

const ProfileTabs = ({ userProfile, user }: Props) => {
	const [tab, setTab] = useState<"aboutyou" | "experience" | "education" | "skills">("aboutyou");
	const [edit, setEdit] = useState<boolean>(false);

	return (
		<div className="block sm:flex gap-4">
			<Tabs tab={tab} setTab={setTab} edit={edit} setEdit={setEdit} />
			<CurrentTab userProfile={userProfile} user={user} tab={tab} edit={edit} />
		</div>
	);
};

export default ProfileTabs;
