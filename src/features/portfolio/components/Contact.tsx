"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

export function Contact({ labels }: { labels: Dictionary["contact"] }) {
    const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
    const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(
        () => () => {
            if (statusTimer.current) clearTimeout(statusTimer.current);
        },
        []
    );
    async function copyEmail() {
        if (statusTimer.current) clearTimeout(statusTimer.current);
        try {
            await navigator.clipboard.writeText(siteConfig.email);
            setStatus("copied");
        } catch {
            setStatus("failed");
        }
        statusTimer.current = setTimeout(() => setStatus("idle"), 4000);
    }
    return (
        <section id="contact" className="contact-section container" aria-labelledby="contact-title">
            <Reveal>
                <div className="contact-orbit" aria-hidden="true" />
                <p className="eyebrow">{labels.eyebrow}</p>
                <h2 id="contact-title">
                    {labels.title}
                    <br />
                    <span>{labels.accent}</span>
                </h2>
                <p className="contact-description">{labels.description}</p>
                {siteConfig.email ? (
                    <div className="contact-actions">
                        <a className="button button-primary" href={`mailto:${siteConfig.email}`}>
                            {labels.email}
                            <ArrowUpRight size={18} />
                        </a>
                        <button
                            type="button"
                            className="icon-button"
                            onClick={copyEmail}
                            aria-label={labels.copy}
                        >
                            {status === "copied" ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        {siteConfig.cv && (
                            <a className="button button-outline" href={siteConfig.cv} download>
                                {labels.cv}
                                <Download size={18} aria-hidden="true" />
                            </a>
                        )}
                        <p className="contact-email">{siteConfig.email}</p>
                        <span role="status">{status !== "idle" ? labels[status] : ""}</span>
                    </div>
                ) : (
                    <p className="contact-pending">
                        <span className="signal-dot" />
                        {labels.pending}
                    </p>
                )}
                {(siteConfig.github || siteConfig.linkedin) && (
                    <div className="social-links">
                        {siteConfig.github && (
                            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                                <Github size={17} />
                                GitHub
                                <ArrowUpRight size={13} />
                            </a>
                        )}
                        {siteConfig.linkedin && (
                            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin size={17} />
                                LinkedIn
                                <ArrowUpRight size={13} />
                            </a>
                        )}
                    </div>
                )}
            </Reveal>
        </section>
    );
}
