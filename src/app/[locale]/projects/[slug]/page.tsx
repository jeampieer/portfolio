import type { Metadata } from "next";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { getDictionary } from "@/lib/i18n";
import { ProjectView } from "@/features/portfolio/components/views/ProjectView";
import { projects } from "@/features/portfolio/data/portfolio";
import { isLocale } from "@/types/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = projects.find((item) => item.slug === slug);
    if (!isLocale(locale) || !project)
        return { title: "404 · JEAMPIEER.TECH", robots: { index: false, follow: false } };
    return {
        ...pageMetadata(
            locale,
            `/projects/${slug}`,
            project.title[locale],
            project.description[locale]
        ),
        title: project.title[locale],
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const project = projects.find((item) => item.slug === slug);
    if (!isLocale(locale) || !project) {
        const recoveryLocale = isLocale(locale) ? locale : "es";
        return (
            <NotFoundContent
                locale={recoveryLocale}
                labels={getDictionary(recoveryLocale).notFound}
                global={!isLocale(locale)}
            />
        );
    }
    return <ProjectView project={project} locale={locale} />;
}
