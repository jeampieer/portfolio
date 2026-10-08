"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectArtwork } from "@/features/portfolio/components/ProjectArtwork";
import { useProjectFilter } from "@/features/portfolio/hooks/useProjectFilter";
import type { Project, ProjectCategory } from "@/features/portfolio/types/portfolio.types";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function MissionArchive({
    projects,
    labels,
    locale,
}: {
    projects: Project[];
    labels: Dictionary["projects"];
    locale: Locale;
}) {
    const { filter, setFilter, visibleProjects } = useProjectFilter(projects);
    const filters: (ProjectCategory | "all")[] = ["all", "frontend", "backend", "fullstack"];
    return (
        <section
            id="projects"
            className="section container section-divider"
            aria-label={labels.title}
        >
            <Reveal>
                <div className="section-heading-row">
                    <SectionHeading {...labels} />
                    <div className="filter-group" role="group" aria-label={labels.filters}>
                        {filters.map((item) => (
                            <button
                                key={item}
                                className={clsx("filter-button", { selected: filter === item })}
                                type="button"
                                aria-pressed={filter === item}
                                onClick={() => setFilter(item)}
                            >
                                {labels[item]}
                            </button>
                        ))}
                    </div>
                </div>
            </Reveal>
            <div className="project-list" aria-live="polite" aria-atomic="true">
                {visibleProjects.map((project) => (
                    <Reveal key={project.slug}>
                        <article
                            className={clsx("project-card", {
                                "project-card-text": !project.artwork && !project.cover,
                            })}
                        >
                            {project.artwork === "orbital-signal" && (
                                <Link
                                    href={`/${locale}/projects/${project.slug}`}
                                    className="project-artwork-link"
                                    aria-label={`${labels.detail}: ${project.title[locale]}`}
                                >
                                    <ProjectArtwork label={labels.preview} />
                                </Link>
                            )}
                            {project.cover && (
                                <Link
                                    href={`/${locale}/projects/${project.slug}`}
                                    className="project-cover-link"
                                    aria-label={`${labels.detail}: ${project.title[locale]}`}
                                >
                                    <Image
                                        src={project.cover.src}
                                        alt={project.cover.alt[locale]}
                                        width={project.cover.width}
                                        height={project.cover.height}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        unoptimized
                                    />
                                </Link>
                            )}
                            <div className="project-info">
                                <p className="eyebrow">
                                    {project.number} / {labels.featured}
                                </p>
                                <span className="project-year mono">
                                    {project.year && `${project.year} · `}
                                    {project.context?.[locale] ?? labels.type}
                                </span>
                                <h3>
                                    <Link href={`/${locale}/projects/${project.slug}`}>
                                        {project.title[locale]}
                                    </Link>
                                </h3>
                                <p>{project.description[locale]}</p>
                                <ul className="tags" aria-label="Stack">
                                    {project.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                                <Link
                                    className="text-link"
                                    href={`/${locale}/projects/${project.slug}`}
                                >
                                    {labels.detail}
                                    <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </article>
                    </Reveal>
                ))}
                {visibleProjects.length === 0 && <p className="empty-state">{labels.empty}</p>}
            </div>
            <div className="next-project">
                <div className="next-project-icon">
                    <Plus size={22} strokeWidth={1} />
                </div>
                <div>
                    <h3>{labels.nextTitle}</h3>
                    <p>{labels.nextDescription}</p>
                </div>
                <a href="#labs" className="text-link">
                    {labels.nextLink}
                    <ArrowUpRight size={16} />
                </a>
            </div>
        </section>
    );
}
