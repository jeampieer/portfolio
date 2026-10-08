import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import { OrbitalScene } from "@/features/portfolio/components/OrbitalScene";
import type { Dictionary } from "@/lib/i18n";

export function Hero({ labels }: { labels: Dictionary["hero"] }) {
    return (
        <section id="hero" className="hero container" aria-labelledby="hero-title">
            <div className="hero-copy">
                <p className="eyebrow hero-eyebrow">
                    <span className="signal-dot" />
                    {labels.eyebrow}
                </p>
                <p className="hero-intro">
                    <span className="typewriter">{labels.intro}</span>
                    <span className="typing-cursor" aria-hidden="true">
                        _
                    </span>
                </p>
                <h1 id="hero-title">
                    {labels.title}
                    <br />
                    <span>{labels.accent}</span>
                </h1>
                <p className="hero-description">{labels.description}</p>
                <div className="hero-actions">
                    <a href="#projects" className="button button-primary">
                        {labels.projects}
                        <ArrowUpRight size={18} />
                    </a>
                    <a href="#about" className="button button-ghost">
                        {labels.about}
                        <MoveRight size={18} />
                    </a>
                </div>
                <div className="hero-stack mono">
                    <span>React</span>
                    <span>Next.js</span>
                    <span>TypeScript</span>
                    <span>Django</span>
                    <span>Node.js</span>
                    <span className="stack-plus">+</span>
                </div>
            </div>
            <OrbitalScene label={labels.orbit} caption={labels.caption} />
            <div className="hero-bottom mono">
                <a href="#about">
                    <ArrowDown size={14} />
                    {labels.scroll}
                </a>
                <span>
                    {labels.note}
                    <span className="small-cross">+</span>
                </span>
            </div>
        </section>
    );
}
