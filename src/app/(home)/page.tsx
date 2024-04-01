import { ListOfSheets } from "@/components";
import React from "react";

type Props = {};

const Page = (props: Props) => {
	return (
		<main className=" mx-auto max-w-7xl p-6 lg:px-8">
			<ListOfSheets />
		</main>
	);
};

export default Page;
