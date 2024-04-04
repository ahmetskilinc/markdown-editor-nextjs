import { cn } from "../../app/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderDesktopLink = ({ title, link }: { title: string; link: string }) => {
	const pathname = usePathname();
	return (
		<Link
			href={link}
			className={cn(
				"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-white",
				pathname === link
					? "border-indigo-500"
					: "border-transparent hover:border-gray-300 hover:text-gray-200"
			)}
		>
			{title}
		</Link>
	);
};

export default HeaderDesktopLink;
