import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Maximize } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { ImageViewer } from "@/features/portfolio/components/ImageViewer";
import { ProjectArtwork } from "@/features/portfolio/components/ProjectArtwork";
import type { Project } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/types/i18n";

export function ProjectView({ project, locale }: { project: Project; locale: Locale }) {
    const { projects: labels, viewer } = getDictionary(locale);
    const sections = (
        ["problem", "participation", "architecture", "decisions", "impact", "learnings"] as const
    ).filter((section) => project[section]);
    return (
        <article className="project-detail container">
            <Link href={`/${locale}#projects`} className="text-link">
                <ArrowLeft size={16} />
                {labels.back}
            </Link>
            <header className="project-detail-header">
                <p className="eyebrow">
                    {project.number} / {project.context?.[locale] ?? labels.type}
                    {project.year && ` / ${project.year}`}
                </p>
                <h1>{project.title[locale]}</h1>
                <p>{project.description[locale]}</p>
                <ul className="tags">
                    {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
                <div className="project-external-links">
                    {project.demoUrl && (
                        <a
                            className="button button-outline"
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {labels.demo}
                            <ArrowUpRight size={16} />
                        </a>
                    )}
                    {project.repositoryUrl && (
                        <a
                            className="button button-outline"
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {labels.repository}
                            <ArrowUpRight size={16} />
                        </a>
                    )}
                </div>
            </header>
            {project.contributionSummary && (
                <aside className="case-contribution surface-card" aria-label={labels.contribution}>
                    <h2>{labels.contribution}</h2>
                    <p>{project.contributionSummary[locale]}</p>
                </aside>
            )}
            <nav className="case-index" aria-label={labels.index}>
                <p className="eyebrow">{labels.index}</p>
                <ul>
                    {sections.map((section) => (
                        <li key={section}>
                            <a href={`#case-${section}`}>{labels[section]}</a>
                        </li>
                    ))}
                    {!!project.features?.length && (
                        <li>
                            <a href="#case-features">{labels.features}</a>
                        </li>
                    )}
                    {!!project.gallery.length && (
                        <li>
                            <a href="#case-gallery">{labels.gallery}</a>
                        </li>
                    )}
                </ul>
            </nav>
            {project.artwork === "orbital-signal" && <ProjectArtwork label={labels.preview} />}
            {project.cover && (
                <figure className="project-cover">
                    <Image
                        src={project.cover.src}
                        alt={project.cover.alt[locale]}
                        width={project.cover.width}
                        height={project.cover.height}
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        unoptimized
                        loading="eager"
                    />
                    {project.galleryNotice && (
                        <figcaption>{project.galleryNotice[locale]}</figcaption>
                    )}
                </figure>
            )}
            <div className="case-study-grid">
                {sections.map((section, index) => (
                    <section
                        key={section}
                        id={`case-${section}`}
                        aria-labelledby={`case-${section}-title`}
                    >
                        <p className="eyebrow">0{index + 1}</p>
                        <h2 id={`case-${section}-title`}>{labels[section]}</h2>
                        <p>{project[section]?.[locale]}</p>
                    </section>
                ))}
            </div>
            {project.features && project.features.length > 0 && (
                <section
                    id="case-features"
                    className="project-features"
                    aria-labelledby="project-features-title"
                >
                    <h2 id="project-features-title">{labels.features}</h2>
                    <ul>
                        {project.features.map((feature) => (
                            <li key={feature.title[locale]} className="surface-card">
                                <h3>{feature.title[locale]}</h3>
                                <p>{feature.description[locale]}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {project.gallery.length > 0 && (
                <section
                    id="case-gallery"
                    className="project-gallery"
                    aria-labelledby="project-gallery-title"
                >
                    <h2 id="project-gallery-title">{labels.gallery}</h2>
                    {project.galleryNotice && (
                        <p className="project-gallery-notice">{project.galleryNotice[locale]}</p>
                    )}
                    <ImageViewer
                        images={project.gallery.map((item) => ({
                            ...item,
                            title: item.title[locale],
                            alt: item.alt[locale],
                            caption: item.caption?.[locale],
                        }))}
                        labels={viewer}
                        notice={project.galleryNotice?.[locale]}
                    >
                        <div className="project-gallery-grid">
                            {project.gallery.map((item, index) => (
                                <figure
                                    key={item.src}
                                    className="gallery-card surface-card surface-card-link"
                                >
                                    <a
                                        href={item.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-viewer-index={index}
                                        className="gallery-image-link"
                                        aria-label={`${viewer.open}: ${item.title[locale]}`}
                                    >
                                        <Image
                                            src={item.src}
                                            alt={item.alt[locale]}
                                            width={item.width}
                                            height={item.height}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            unoptimized
                                        />
                                    </a>
                                    <figcaption>
                                        <h3>{item.title[locale]}</h3>
                                        {item.caption && <p>{item.caption[locale]}</p>}
                                        <a
                                            href={item.src}
                                            data-viewer-index={index}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-link viewer-trigger"
                                            aria-label={`${viewer.open}: ${item.title[locale]}`}
                                        >
                                            {viewer.open}
                                            <Maximize size={16} aria-hidden="true" />
                                        </a>
                                        <a
                                            href={item.src}
                                            className="text-link original-image-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${labels.openImage}: ${item.title[locale]}`}
                                        >
                                            {labels.openImage}
                                            <ArrowUpRight size={16} aria-hidden="true" />
                                        </a>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </ImageViewer>
                </section>
            )}
            <Link href={`/${locale}#projects`} className="button button-outline">
                <ArrowLeft size={16} />
                {labels.back}
            </Link>
        </article>
    );
}
