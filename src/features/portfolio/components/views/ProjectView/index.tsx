import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { ProjectArtwork } from "@/features/portfolio/components/ProjectArtwork";
import type { Project } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/types/i18n";

export function ProjectView({ project, locale }: { project: Project; locale: Locale }) {
    const { projects: labels } = getDictionary(locale);
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
                    />
                    {project.galleryNotice && (
                        <figcaption>{project.galleryNotice[locale]}</figcaption>
                    )}
                </figure>
            )}
            <div className="case-study-grid">
                {sections.map((section, index) => (
                    <section key={section}>
                        <p className="eyebrow">0{index + 1}</p>
                        <h2>{labels[section]}</h2>
                        <p>{project[section]?.[locale]}</p>
                    </section>
                ))}
            </div>
            {project.features && project.features.length > 0 && (
                <section className="project-features" aria-labelledby="project-features-title">
                    <h2 id="project-features-title">{labels.features}</h2>
                    <ul>
                        {project.features.map((feature) => (
                            <li key={feature.title[locale]}>
                                <h3>{feature.title[locale]}</h3>
                                <p>{feature.description[locale]}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {project.gallery.length > 0 && (
                <section className="project-gallery" aria-labelledby="project-gallery-title">
                    <h2 id="project-gallery-title">{labels.gallery}</h2>
                    {project.galleryNotice && (
                        <p className="project-gallery-notice">{project.galleryNotice[locale]}</p>
                    )}
                    <div className="project-gallery-grid">
                        {project.gallery.map((item) => (
                            <figure key={item.src}>
                                <Image
                                    src={item.src}
                                    alt={item.alt[locale]}
                                    width={item.width}
                                    height={item.height}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                                <figcaption>
                                    <h3>{item.title[locale]}</h3>
                                    {item.caption && <p>{item.caption[locale]}</p>}
                                    <a
                                        href={item.src}
                                        className="text-link"
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
                </section>
            )}
            <Link href={`/${locale}#projects`} className="button button-outline">
                <ArrowLeft size={16} />
                {labels.back}
            </Link>
        </article>
    );
}
