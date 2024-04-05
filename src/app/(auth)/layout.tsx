import PlainHeader from "../../components/Common/PlainHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<PlainHeader />
			<main className="pt-16">{children}</main>
		</>
	);
}
