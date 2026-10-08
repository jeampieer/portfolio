import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/types/i18n";
import { projects } from "@/features/portfolio/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
    if (!siteConfig.url) return [];
    return locales.flatMap((locale) =>
        ["", ...projects.map((project) => `/projects/${project.slug}`)].map((path) => ({
            url: `${siteConfig.url}/${locale}${path}`,
            alternates: {
                languages: { es: `${siteConfig.url}/es${path}`, en: `${siteConfig.url}/en${path}` },
            },
        }))
    );
}
