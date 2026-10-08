import { GraduationCap, Languages, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, languages } from "@/features/portfolio/data/portfolio";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function Education({ labels, locale }: { labels: Dictionary["education"]; locale: Locale }) {
    return (
        <section
            id="education"
            className="section section-divider container"
            aria-label={labels.title}
        >
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <ol className="education-grid">
                {education.map((entry, index) => (
                    <li key={entry.id}>
                        <Reveal delay={index * 50}>
                            <article className="education-card surface-card">
                                <div className="education-card-top">
                                    <GraduationCap size={24} strokeWidth={1.5} aria-hidden="true" />
                                    <span className="education-status">
                                        {entry.status === "in-progress"
                                            ? labels.inProgress
                                            : labels.graduate}
                                    </span>
                                </div>
                                <p className="education-period mono">{entry.period[locale]}</p>
                                <h3>{entry.program[locale]}</h3>
                                <p className="education-institution">{entry.institution}</p>
                                <p className="education-location">
                                    <MapPin size={14} aria-hidden="true" />
                                    {entry.location[locale]}
                                </p>
                            </article>
                        </Reveal>
                    </li>
                ))}
            </ol>
            <Reveal>
                <div className="education-languages surface-card">
                    <h3>
                        <Languages size={20} strokeWidth={1.5} aria-hidden="true" />
                        {labels.languages}
                    </h3>
                    <dl className="language-grid">
                        {languages.map((language) => (
                            <div key={language.id}>
                                <dt>{language.name[locale]}</dt>
                                <dd>
                                    <span className="language-level">{language.level[locale]}</span>
                                    {language.description && (
                                        <span className="language-description">
                                            {language.description[locale]}
                                        </span>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </Reveal>
        </section>
    );
}
