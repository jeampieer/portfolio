import { CodeXml, Compass, Fingerprint, Telescope } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

const icons = [CodeXml, Fingerprint, Telescope, Compass];

export function IdentitySignal({ labels }: { labels: Dictionary["about"] }) {
    return (
        <section id="about" className="section container" aria-label={labels.title}>
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <div className="identity-grid">
                {labels.cards.map((card, i) => {
                    const Icon = icons[i];
                    return (
                        <Reveal key={card.title}>
                            <article className="identity-card">
                                <div className="card-top">
                                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                                    <span className="mono">0{i + 1}</span>
                                </div>
                                <h3>{card.title}</h3>
                                <p>{card.body}</p>
                            </article>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
