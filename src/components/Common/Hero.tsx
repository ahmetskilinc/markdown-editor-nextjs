import Link from "next/link";
import React from "react";

type Props = {
	children: React.ReactNode;
	bg?: string;
};

const Hero = ({ children, bg }: Props) => {
	return (
		<div style={{ backgroundImage: bg ? `url(${bg})` : "" }} className="h-[640px] bg-slate-300">
			<div className="container px-2 sm:px-6 lg:px-8 h-full mx-auto flex flex-col items-center justify-center">
				{children}
			</div>
		</div>
	);
};

const Header = ({ children }: { children: string }) => {
	return (
		<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{children}</h1>
	);
};

const Subheader = ({ children }: { children: string }) => {
	return <h3 className="mt-6 text-lg leading-8 text-gray-600">{children}</h3>;
};

const CTA = ({ children, href }: { children: string; href: string }) => {
	return (
		<Link
			href={href}
			className="font-mono text-sm font-semibold leading-6 text-gray-900 hover:underline"
		>
			{children} <span aria-hidden="true">→</span>
		</Link>
	);
};

const Accouncement = ({ children, href }: { children: string; href?: string }) => {
	return href ? (
		<div className="mb-8 flex justify-center">
			<div className="relative rounded-full px-3 py-1 text-xs leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/25">
				{children}{" "}
				<Link href={`${href}`} className="font-semibold text-indigo-600">
					<span className="absolute inset-0" aria-hidden="true" /> Read more{" "}
					<span aria-hidden="true">&rarr;</span>
				</Link>
			</div>
		</div>
	) : (
		<div className="mb-8 flex justify-center">
			<div className="relative rounded-full px-3 py-1 text-xs leading-6 text-gray-600 ring-1 ring-gray-900/10">
				{children}
			</div>
		</div>
	);
};

Hero.Header = Header;
Hero.Subheader = Subheader;
Hero.CTA = CTA;
Hero.Announcement = Accouncement;

export default Hero;
