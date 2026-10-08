import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

export function OrbitalTimeline({ labels }: { labels: Dictionary["timeline"] }) {
    return (
        <section id="process" className="process-section" aria-label={labels.title}>
            <Reveal>
                <div className="process-heading">
                    <h3>{labels.title}</h3>
                    <p className="section-description">{labels.description}</p>
                </div>
            </Reveal>
            <ol className="timeline">
                {labels.steps.map((step, index) => (
                    <li key={step.label}>
                        <Reveal delay={index * 50}>
                            <span className="timeline-dot" aria-hidden="true" />
                            <p className="eyebrow">{step.label}</p>
                            <h4>{step.title}</h4>
                            <p>{step.body}</p>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </section>
    );
}
