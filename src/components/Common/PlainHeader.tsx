import Link from "next/link";

export default function PlainHeader() {
	return (
		<nav className="bg-indigo-600 shadow fixed w-full z-40">
			<div className="mx-auto container px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 justify-center">
					<div className="flex flex-shrink-0 items-center font-serif">
						<Link href="/">
							<img className="h-5 w-auto" src="/logo.png" alt="" />
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
