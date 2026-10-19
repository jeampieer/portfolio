import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectArtwork } from "@/features/portfolio/components/ProjectArtwork";
import { ProjectCarousel } from "@/features/portfolio/components/ProjectCarousel";
import type { Project } from "@/features/portfolio/types/portfolio.types";
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
    return (
        <section
            id="projects"
            className="section container section-divider"
            aria-label={labels.title}
        >
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <ProjectCarousel
                items={projects.map((project) => ({
                    slug: project.slug,
                    title: project.title[locale],
                }))}
                labels={labels.carousel}
            >
                {projects.map((project) => (
                    <article
                        key={project.slug}
                        className={clsx("project-card surface-card surface-card-link", {
                            "project-card-text": !project.artwork && !project.cover,
                        })}
                    >
                        {project.artwork === "orbital-signal" && (
                            <div className="project-artwork-link">
                                <ProjectArtwork label={labels.preview} />
                            </div>
                        )}
                        {project.cover && (
                            <div className="project-cover-link">
                                <Image
                                    src={project.cover.src}
                                    alt={project.cover.alt[locale]}
                                    width={project.cover.width}
                                    height={project.cover.height}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                            </div>
                        )}
                        <div className="project-info">
                            <p className="eyebrow">{labels.featured}</p>
                            <span className="project-year mono">
                                {project.year && `${project.year} · `}
                                {project.context?.[locale] ?? labels.type}
                            </span>
                            <h3 id={`project-${project.slug}`}>{project.title[locale]}</h3>
                            <p>{project.description[locale]}</p>
                            {project.contributionSummary && (
                                <p className="contribution-summary">
                                    <strong>{labels.contribution}:</strong>{" "}
                                    {project.contributionSummary[locale]}
                                </p>
                            )}
                            <ul className="tags" aria-label="Stack">
                                {project.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                            <Link
                                className="project-card-action"
                                aria-describedby={`project-${project.slug}`}
                                href={`/${locale}/projects/${project.slug}`}
                            >
                                <span className="button button-primary project-card-cta">
                                    {labels.detail}
                                    <ArrowUpRight size={18} aria-hidden="true" />
                                </span>
                            </Link>
                        </div>
                    </article>
                ))}
            </ProjectCarousel>
        </section>
    );
}
