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
                    title: project.cardTitle?.[locale] ?? project.title[locale],
                }))}
                labels={labels.carousel}
            >
                {projects.map((project) => (
                    <article
                        key={project.slug}
                        className={clsx("project-card surface-card", {
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
                                    sizes="(max-width: 1023px) 100vw, 50vw"
                                    draggable={false}
                                    unoptimized
                                />
                            </div>
                        )}
                        <div className="project-info">
                            <h3 id={`project-${project.slug}`}>
                                {project.cardTitle?.[locale] ?? project.title[locale]}
                            </h3>
                            <p className="project-summary">
                                {project.cardDescription?.[locale] ?? project.description[locale]}
                            </p>
                            <Link
                                className="button button-primary project-card-action"
                                aria-describedby={`project-${project.slug}`}
                                href={`/${locale}/projects/${project.slug}`}
                            >
                                {labels.detail}
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </article>
                ))}
            </ProjectCarousel>
        </section>
    );
}
