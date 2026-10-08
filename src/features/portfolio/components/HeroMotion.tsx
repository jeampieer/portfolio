"use client";

import { useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { useInView } from "framer-motion";
import {
    usePageVisible,
    useReducedMotionPreference,
} from "@/features/portfolio/hooks/useMotionPreferences";
import type { Dictionary } from "@/lib/i18n";

function subscribeHydration() {
    return () => {};
}

export function HeroMotion({
    children,
    scene,
    footer,
    labels,
}: {
    children: ReactNode;
    scene: ReactNode;
    footer: ReactNode;
    labels: Pick<Dictionary["hero"], "pauseMotion" | "resumeMotion" | "reducedMotion">;
}) {
    const section = useRef<HTMLElement>(null);
    const portrait = useRef<HTMLDivElement>(null);
    const inView = useInView(section, { amount: 0.1 });
    const portraitInView = useInView(portrait, { amount: 0.15 });
    const visible = usePageVisible();
    const reduced = useReducedMotionPreference();
    const hydrated = useSyncExternalStore(
        subscribeHydration,
        () => true,
        () => false
    );
    const [paused, setPaused] = useState(false);
    const running = !paused && !reduced && visible;
    const style = {
        "--hero-motion-state": running && inView ? "running" : "paused",
        "--portrait-motion-state": running && portraitInView ? "running" : "paused",
    } as CSSProperties;

    return (
        <section
            ref={section}
            id="hero"
            className="hero container"
            aria-labelledby="hero-title"
            data-motion-ready={hydrated ? "true" : undefined}
            data-motion-paused={paused ? "true" : undefined}
            style={style}
        >
            {children}
            <div ref={portrait} className="hero-scene">
                {scene}
                <div className="hero-motion-controls">
                    <button
                        type="button"
                        className="hero-motion-toggle"
                        disabled={!hydrated || reduced}
                        onClick={() => setPaused((value) => !value)}
                    >
                        {paused && !reduced ? (
                            <Play size={13} aria-hidden="true" />
                        ) : (
                            <Pause size={13} aria-hidden="true" />
                        )}
                        {reduced
                            ? labels.reducedMotion
                            : paused
                              ? labels.resumeMotion
                              : labels.pauseMotion}
                    </button>
                </div>
            </div>
            {footer}
        </section>
    );
}
