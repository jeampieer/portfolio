import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioView } from "@/features/portfolio/components/views/PortfolioView";
import { isLocale } from "@/types/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const { meta } = getDictionary(locale);
    return pageMetadata(locale, "", meta.title, meta.description);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    return <PortfolioView locale={locale} />;
}
