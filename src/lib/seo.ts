import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types/i18n";

export function pageMetadata(
    locale: Locale,
    path: string,
    title: string,
    description: string
): Metadata {
    return {
        description,
        ...(siteConfig.url
            ? {
                  alternates: {
                      canonical: `/${locale}${path}`,
                      languages: { es: `/es${path}`, en: `/en${path}`, "x-default": `/es${path}` },
                  },
                  openGraph: {
                      title,
                      description,
                      type: "website",
                      siteName: siteConfig.brand,
                      locale: locale === "es" ? "es_ES" : "en_US",
                      alternateLocale: locale === "es" ? "en_US" : "es_ES",
                      url: `/${locale}${path}`,
                  },
              }
            : {}),
    };
}
