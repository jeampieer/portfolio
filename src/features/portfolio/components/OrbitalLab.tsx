"use client";

import { useId, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

export function OrbitalLab({ labels }: { labels: Dictionary["labs"] }) {
    const [speed, setSpeed] = useState(1);
    const [elliptical, setElliptical] = useState(false);
    const [paused, setPaused] = useState(false);
    const reduced = useReducedMotion();
    const inputId = useId();
    const style = {
        "--orbit-duration": `${18 / speed}s`,
        "--orbit-state": paused || reduced ? "paused" : "running",
    } as CSSProperties;
    return (
        <section id="labs" className="section container section-divider" aria-label={labels.title}>
            <Reveal>
                <SectionHeading {...labels} />
            </Reveal>
            <Reveal>
                <div className="lab-card">
                    <div
                        className={clsx("lab-visual", { elliptical })}
                        style={style}
                        aria-hidden="true"
                    >
                        <div className="lab-grid" />
                        <div className="lab-orbit">
                            <div className="lab-orbiter">
                                <span />
                            </div>
                        </div>
                        <div className="lab-center">j.</div>
                        <span className="lab-coordinate mono">
                            {speed.toFixed(2)}× / {elliptical ? "ELLIPTIC" : "CIRCULAR"}
                        </span>
                        <span className="lab-cross">+</span>
                    </div>
                    <div className="lab-controls">
                        <p className="eyebrow">
                            <span className="signal-dot" />
                            {labels.live}
                        </p>
                        <h3>{labels.titleCard}</h3>
                        <p>{labels.descriptionCard}</p>
                        <div className="range-label">
                            <label htmlFor={inputId}>{labels.speed}</label>
                            <output htmlFor={inputId} className="mono">
                                {speed.toFixed(2)}×
                            </output>
                        </div>
                        <input
                            id={inputId}
                            type="range"
                            min="0.25"
                            max="2"
                            step="0.25"
                            value={speed}
                            onChange={(event) => setSpeed(Number(event.target.value))}
                        />
                        <fieldset>
                            <legend>{labels.orbit}</legend>
                            <div className="filter-group">
                                <button
                                    type="button"
                                    className={clsx("filter-button", { selected: !elliptical })}
                                    aria-pressed={!elliptical}
                                    onClick={() => setElliptical(false)}
                                >
                                    {labels.circular}
                                </button>
                                <button
                                    type="button"
                                    className={clsx("filter-button", { selected: elliptical })}
                                    aria-pressed={elliptical}
                                    onClick={() => setElliptical(true)}
                                >
                                    {labels.elliptical}
                                </button>
                            </div>
                        </fieldset>
                        <div className="lab-actions">
                            <button
                                type="button"
                                className="button button-small button-outline"
                                onClick={() => setPaused(!paused)}
                                disabled={!!reduced}
                            >
                                {paused || reduced ? <Play size={14} /> : <Pause size={14} />}{" "}
                                {paused || reduced ? labels.play : labels.pause}
                            </button>
                            <button
                                type="button"
                                className="icon-button"
                                aria-label={labels.reset}
                                onClick={() => {
                                    setSpeed(1);
                                    setElliptical(false);
                                    setPaused(false);
                                }}
                            >
                                <RotateCcw size={16} />
                            </button>
                        </div>
                        {reduced && <p className="reduced-note">{labels.reduced}</p>}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
