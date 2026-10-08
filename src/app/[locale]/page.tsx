import type { Metadata } from "next";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
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
    if (!isLocale(locale))
        return { title: "404 · JEAMPIEER.TECH", robots: { index: false, follow: false } };
    const { meta } = getDictionary(locale);
    return pageMetadata(locale, "", meta.title, meta.description);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale))
        return <NotFoundContent locale="es" labels={getDictionary("es").notFound} global />;
    return <PortfolioView locale={locale} />;
}
