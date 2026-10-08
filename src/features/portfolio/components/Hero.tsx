import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { OrbitalScene } from "@/features/portfolio/components/OrbitalScene";
import { HeroMotion } from "@/features/portfolio/components/HeroMotion";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";

export function Hero({ labels }: { labels: Dictionary["hero"] }) {
    return (
        <HeroMotion
            labels={labels}
            scene={<OrbitalScene label={labels.orbit} caption={labels.caption} />}
            footer={
                <div className="hero-bottom mono">
                    <a href="#projects">
                        <ArrowDown size={14} />
                        {labels.scroll}
                    </a>
                    <span>
                        {labels.note}
                        <span className="small-cross">+</span>
                    </span>
                </div>
            }
        >
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
                    {siteConfig.cv && (
                        <a href={siteConfig.cv} download className="button button-ghost">
                            {labels.cv}
                            <Download size={18} aria-hidden="true" />
                        </a>
                    )}
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
        </HeroMotion>
    );
}
