import SheetCard, { Sheet } from "./Sheet";

const people = [
	{
		name: "Jane Cooper",
		title: "Paradigm Representative",
		role: "Admin",
		email: "janecooper@example.com",
		telephone: "+1-202-555-0170",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
	},
];

export const Sheets = ({ sheets }: { sheets: Sheet[] }) => {
	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{sheets.map((sheet) => (
				<SheetCard key={sheet.id} sheet={sheet} />
			))}
		</ul>
	);
};
