import Image from "next/image";
import { ArrowUpRight, ImageIcon, Linkedin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences, getExperienceImage } from "@/features/portfolio/data/experiences";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function ProfessionalExperiences({
    labels,
    locale,
}: {
    labels: Dictionary["experiences"];
    locale: Locale;
}) {
    return (
        <section
            id="experiences"
            className="section section-divider container"
            aria-label={labels.title}
        >
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <div className="experience-grid">
                {experiences.map((experience, index) => {
                    const imageSrc = getExperienceImage(experience.imageFile);
                    return (
                        <Reveal key={experience.id} delay={index * 50}>
                            <article className="experience-card surface-card surface-card-link">
                                <div className="experience-publisher">
                                    <Linkedin size={19} aria-hidden="true" />
                                    <div>
                                        <span>{labels.publishedBy}</span>
                                        <p>{experience.publisher}</p>
                                    </div>
                                </div>
                                <figure>
                                    {imageSrc ? (
                                        <a
                                            className="experience-capture"
                                            href={imageSrc}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${labels.openImage}: ${experience.publisher}`}
                                        >
                                            <Image
                                                src={imageSrc}
                                                alt={experience.imageAlt[locale]}
                                                fill
                                                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 80px) / 2), 628px"
                                                unoptimized
                                            />
                                        </a>
                                    ) : (
                                        <div className="experience-placeholder">
                                            <ImageIcon
                                                size={32}
                                                strokeWidth={1.3}
                                                aria-hidden="true"
                                            />
                                            <p>{labels.pendingImage}</p>
                                            <span>{labels.pendingDescription}</span>
                                        </div>
                                    )}
                                    <figcaption className="experience-content">
                                        <p className="eyebrow">{experience.category[locale]}</p>
                                        <h3>{experience.title[locale]}</h3>
                                        <p className="experience-description">
                                            {experience.description[locale]}
                                        </p>
                                        {imageSrc && (
                                            <a
                                                className="text-link"
                                                href={imageSrc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${labels.openImage}: ${experience.publisher}`}
                                            >
                                                {labels.openImage}
                                                <ArrowUpRight size={16} aria-hidden="true" />
                                            </a>
                                        )}
                                    </figcaption>
                                </figure>
                            </article>
                        </Reveal>
                    );
                })}
            </div>
            <p className="experience-note">{labels.note}</p>
        </section>
    );
}
