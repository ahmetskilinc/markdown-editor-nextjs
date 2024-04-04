import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Markdown",
		short_name: "Markdown",
		description: "An application built with Next.js",
		start_url: "/",
		display: "standalone",
		display_override: ["standalone", "minimal-ui"],
		background_color: "rgb(79,70,229)",
		theme_color: "#ffffff",
		id: "/",
		icons: [
			{
				src: "/manifest-icon-192.maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/manifest-icon-192.maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/manifest-icon-512.maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/manifest-icon-512.maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		shortcuts: [
			{
				name: "New sheet",
				url: "/new",
				icons: [
					{
						src: "/add.png",
						sizes: "832x832",
					},
				],
			},
		],
		screenshots: [
			{
				src: "/mobile-screenshot.png",
				sizes: "1290x2796",
				type: "image/png",
			},
			{
				src: "/desktop-screenshot.png",
				sizes: "4072x2392",
				type: "image/png",
				// @ts-expect-error
				form_factor: "wide",
			},
		],
	};
}
