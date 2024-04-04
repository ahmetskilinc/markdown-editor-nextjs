import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Markdown",
		short_name: "Markdown",
		description: "An application built with Next.js",
		start_url: "/",
		display: "standalone",
		background_color: "rgb(79,70,229)",
		theme_color: "#ffffff",
		id: "/",
		icons: [
			{
				src: "public/manifest-icon-192.maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "public/manifest-icon-192.maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "public/manifest-icon-512.maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "public/manifest-icon-512.maskable.png",
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
		],
	};
}
