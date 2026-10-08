import { Braces, Cloud, CodeXml, Cpu, Database, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillGroup } from "@/features/portfolio/types/portfolio.types";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

const icons = {
    frontend: CodeXml,
    backend: Braces,
    database: Database,
    cloud: Cloud,
    ai: Cpu,
    tools: Wrench,
};

export function EngineeringArsenal({
    labels,
    groups,
    locale,
}: {
    labels: Dictionary["stack"];
    groups: SkillGroup[];
    locale: Locale;
}) {
    return (
        <section id="stack" className="section container section-divider" aria-label={labels.title}>
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <div className="skills-grid">
                {groups
                    .filter((group) => group.items.length > 0)
                    .map((group, index) => {
                        const Icon = icons[group.id];
                        return (
                            <Reveal key={group.id} delay={index * 50}>
                                <div className="skill-group surface-card">
                                    <h3>
                                        <Icon size={20} aria-hidden="true" />
                                        {group.label[locale]}
                                    </h3>
                                    <ul>
                                        {group.items.map((item) => (
                                            <li key={item}>
                                                <span className="skill-marker" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        );
                    })}
            </div>
            <p className="stack-note mono">
                <span className="small-cross">+</span>
                {labels.note}
            </p>
        </section>
    );
}
