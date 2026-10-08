import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    if (!isLocale(locale) || !project) notFound();
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
    if (!isLocale(locale) || !project) notFound();
    return <ProjectView project={project} locale={locale} />;
}
