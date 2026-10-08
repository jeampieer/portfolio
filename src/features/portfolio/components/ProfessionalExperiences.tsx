import Image from "next/image";
import { ArrowUpRight, Maximize, ImageIcon, Linkedin } from "lucide-react";
import { ImageViewer } from "@/features/portfolio/components/ImageViewer";
import { getDictionary } from "@/lib/i18n";
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
    const viewer = getDictionary(locale).viewer;
    const captures = experiences.flatMap((experience) => {
        const src = getExperienceImage(experience.imageFile);
        return src
            ? [
                  {
                      src,
                      width: experience.imageWidth,
                      height: experience.imageHeight,
                      title: `${experience.title[locale]} · ${experience.publisher}`,
                      alt: experience.imageAlt[locale],
                      caption: `${labels.publishedBy} ${experience.publisher}. ${experience.description[locale]}`,
                  },
              ]
            : [];
    });
    return (
        <section
            id="experiences"
            className="section section-divider container"
            aria-label={labels.title}
        >
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <ImageViewer images={captures} labels={viewer} notice={labels.note}>
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
                                                data-viewer-index={captures.findIndex(
                                                    (image) => image.src === imageSrc
                                                )}
                                                href={imageSrc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${viewer.open}: ${experience.publisher}`}
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
                                                <div className="capture-actions">
                                                    <a
                                                        href={imageSrc}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        data-viewer-index={captures.findIndex(
                                                            (image) => image.src === imageSrc
                                                        )}
                                                        className="text-link"
                                                        aria-label={`${viewer.open}: ${experience.publisher}`}
                                                    >
                                                        {viewer.open}
                                                        <Maximize size={16} aria-hidden="true" />
                                                    </a>
                                                    <a
                                                        className="text-link original-image-link"
                                                        href={imageSrc}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`${labels.openImage}: ${experience.publisher}`}
                                                    >
                                                        {labels.openImage}
                                                        <ArrowUpRight
                                                            size={16}
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </div>
                                            )}
                                        </figcaption>
                                    </figure>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </ImageViewer>
            <p className="experience-note">{labels.note}</p>
        </section>
    );
}
