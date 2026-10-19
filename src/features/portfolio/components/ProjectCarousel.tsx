"use client";

import { Children, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";
import { useReducedMotionPreference } from "@/features/portfolio/hooks/useMotionPreferences";
import type { Dictionary } from "@/lib/i18n";

const subscribeReady = () => () => {};

export function ProjectCarousel({
    children,
    items,
    labels,
}: {
    children: ReactNode;
    items: { slug: string; title: string }[];
    labels: Dictionary["projects"]["carousel"];
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef(0);
    const [active, setActive] = useState(0);
    const ready = useSyncExternalStore(
        subscribeReady,
        () => true,
        () => false
    );
    const reducedMotion = useReducedMotionPreference();

    function goTo(index: number, animate = true) {
        const track = trackRef.current;
        const slide = track?.children[index] as HTMLElement | undefined;
        const first = track?.firstElementChild as HTMLElement | null;
        if (!track || !slide || !first) return;
        activeRef.current = index;
        setActive(index);
        track.scrollTo({
            left: slide.offsetLeft - first.offsetLeft,
            behavior: animate && !reducedMotion ? "smooth" : "instant",
        });
    }

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let timer: ReturnType<typeof setTimeout>;

        function syncPosition() {
            if (!track) return;
            const slides = Array.from(track.children) as HTMLElement[];
            const start = slides[0]?.offsetLeft ?? 0;
            const index = slides.reduce(
                (closest, slide, candidate) =>
                    Math.abs(slide.offsetLeft - start - track.scrollLeft) <
                    Math.abs(slides[closest].offsetLeft - start - track.scrollLeft)
                        ? candidate
                        : closest,
                0
            );
            activeRef.current = index;
            setActive(index);
        }

        function onScroll() {
            clearTimeout(timer);
            timer = setTimeout(syncPosition, 120);
        }

        const observer = new ResizeObserver(() => {
            const slide = track.children[activeRef.current] as HTMLElement | undefined;
            const first = track.firstElementChild as HTMLElement | null;
            if (slide && first)
                track.scrollTo({ left: slide.offsetLeft - first.offsetLeft, behavior: "instant" });
        });
        observer.observe(track);
        track.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            observer.disconnect();
            track.removeEventListener("scroll", onScroll);
        };
    }, [items.length]);

    if (items.length === 0) return null;

    const position = labels.position
        .replace("{current}", String(active + 1))
        .replace("{total}", String(items.length));

    return (
        <div
            className="project-carousel"
            data-ready={ready}
            role="group"
            aria-roledescription={labels.role}
            aria-label={labels.label}
        >
            <div className="project-carousel-toolbar">
                <p className="project-carousel-hint">
                    <MoveHorizontal size={16} aria-hidden="true" />
                    {labels.hint}
                </p>
                <p className="project-carousel-count mono" aria-hidden="true">
                    <span>{String(active + 1).padStart(2, "0")}</span>
                    <span>/ {String(items.length).padStart(2, "0")}</span>
                </p>
            </div>
            <div className="project-carousel-stage">
                <div className="project-carousel-controls" inert={!ready} aria-hidden={!ready}>
                    <button
                        type="button"
                        className="project-carousel-arrow project-carousel-previous"
                        aria-label={labels.previous}
                        aria-controls="project-carousel-track"
                        aria-disabled={active === 0}
                        onClick={() => active > 0 && goTo(active - 1)}
                    >
                        <ArrowLeft size={20} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="project-carousel-arrow project-carousel-next"
                        aria-label={labels.next}
                        aria-controls="project-carousel-track"
                        aria-disabled={active === items.length - 1}
                        onClick={() => active < items.length - 1 && goTo(active + 1)}
                    >
                        <ArrowRight size={20} aria-hidden="true" />
                    </button>
                </div>
                <div
                    ref={trackRef}
                    id="project-carousel-track"
                    className="project-list"
                    role="group"
                    tabIndex={0}
                    aria-label={labels.track}
                    onKeyDown={(event) => {
                        if (
                            event.target !== event.currentTarget ||
                            event.altKey ||
                            event.ctrlKey ||
                            event.metaKey
                        )
                            return;
                        const destination = {
                            ArrowLeft: Math.max(0, active - 1),
                            ArrowRight: Math.min(items.length - 1, active + 1),
                            Home: 0,
                            End: items.length - 1,
                        }[event.key];
                        if (destination === undefined) return;
                        event.preventDefault();
                        goTo(destination);
                    }}
                    onFocusCapture={(event) => {
                        const slide = (event.target as HTMLElement).closest<HTMLElement>(
                            "[data-project-slide]"
                        );
                        if (slide) goTo(Number(slide.dataset.projectSlide), false);
                    }}
                >
                    {Children.map(children, (child, index) => (
                        <div
                            className="project-slide"
                            id={`project-slide-${items[index].slug}`}
                            data-project-slide={index}
                            role="group"
                            aria-roledescription={labels.slide}
                            aria-labelledby={`project-${items[index].slug}`}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="project-carousel-pagination"
                role="group"
                aria-label={labels.select}
                inert={!ready}
                aria-hidden={!ready}
            >
                {items.map((item, index) => (
                    <button
                        key={item.slug}
                        type="button"
                        aria-label={`${labels.goTo}: ${item.title}`}
                        aria-controls={`project-slide-${item.slug}`}
                        aria-disabled={active === index}
                        data-active={active === index}
                        onClick={() => active !== index && goTo(index)}
                    >
                        <span aria-hidden="true" />
                    </button>
                ))}
            </div>
            <p className="sr-only" role="status" aria-atomic="true">
                {ready ? `${position}: ${items[active].title}` : ""}
            </p>
        </div>
    );
}
