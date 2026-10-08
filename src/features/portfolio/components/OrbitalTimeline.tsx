import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

export function OrbitalTimeline({ labels }: { labels: Dictionary["timeline"] }) {
    return (
        <section
            id="process"
            className="section section-divider container process-section"
            aria-label={labels.title}
        >
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <ol className="timeline">
                {labels.steps.map((step) => (
                    <li key={step.label}>
                        <Reveal>
                            <span className="timeline-dot" aria-hidden="true" />
                            <p className="eyebrow">{step.label}</p>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </section>
    );
}
