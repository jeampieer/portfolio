import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "@fontsource-variable/geist";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@/app/globals.css";
import { AppProvider } from "@/providers/AppProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { isLocale, locales } from "@/types/i18n";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const { meta } = getDictionary(locale);
    return {
        title: { default: meta.title, template: "%s · JEAMPIEER.TECH" },
        description: meta.description,
        metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
        robots: { index: !!siteConfig.url, follow: !!siteConfig.url },
        icons: { icon: "/icon.svg" },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const dictionary = getDictionary(locale);
    return (
        <html lang={locale} suppressHydrationWarning>
            <body id="top">
                <AppProvider>
                    <a className="skip-link" href="#main-content">
                        {dictionary.nav.skip}
                    </a>
                    <Header locale={locale} labels={dictionary.nav} />
                    <main id="main-content">{children}</main>
                    <Footer locale={locale} labels={dictionary.footer} />
                </AppProvider>
            </body>
        </html>
    );
}
