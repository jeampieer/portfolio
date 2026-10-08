"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize, Minimize, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import type { Dictionary } from "@/lib/i18n";

export interface ViewerImage {
    src: string;
    width: number;
    height: number;
    title: string;
    alt: string;
    caption?: string;
}

// Children are composed on the server. Their original-file links work without JavaScript.
export function ImageViewer({
    images,
    labels,
    notice,
    children,
}: {
    images: ViewerImage[];
    labels: Dictionary["viewer"];
    notice?: string;
    children: ReactNode;
}) {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [originalSize, setOriginalSize] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const viewport = useRef<HTMLDivElement>(null);
    const opener = useRef<HTMLElement | null>(null);
    const titleId = useId();
    const image = images[index];

    useEffect(() => {
        if (!open || !dialog.current) return;
        const element = dialog.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        element.showModal();
        return () => {
            if (element.open) element.close();
            document.body.style.overflow = previousOverflow;
            opener.current?.focus({ preventScroll: true });
        };
    }, [open]);

    function navigate(nextIndex: number) {
        if (nextIndex < 0 || nextIndex >= images.length) return;
        setIndex(nextIndex);
        setOriginalSize(false);
        viewport.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    return (
        <div
            className="image-viewer-group"
            onClickCapture={(event) => {
                if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                )
                    return;
                const link =
                    event.target instanceof Element
                        ? event.target.closest<HTMLAnchorElement>("a[data-viewer-index]")
                        : null;
                if (!link || !event.currentTarget.contains(link)) return;
                const nextIndex = Number(link.dataset.viewerIndex);
                if (!Number.isInteger(nextIndex) || !images[nextIndex]) return;
                event.preventDefault();
                opener.current = link;
                navigate(nextIndex);
                setHasOpened(true);
                setOpen(true);
            }}
        >
            {children}
            <dialog
                ref={dialog}
                className="image-viewer"
                aria-labelledby={titleId}
                onClose={() => setOpen(false)}
                onKeyDown={(event) => {
                    if (event.key === "Tab") {
                        const controls = Array.from(
                            event.currentTarget.querySelectorAll<HTMLElement>(
                                'button:not(:disabled), a[href], [tabindex="0"]'
                            )
                        ).filter((element) => element.getClientRects().length > 0);
                        const first = controls[0];
                        const last = controls[controls.length - 1];
                        if (event.shiftKey && document.activeElement === first) {
                            event.preventDefault();
                            last?.focus();
                        } else if (!event.shiftKey && document.activeElement === last) {
                            event.preventDefault();
                            first?.focus();
                        }
                    }
                    // At original size, arrow keys retain native scrolling in the image region.
                    if (
                        originalSize ||
                        event.altKey ||
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey
                    )
                        return;
                    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                        event.preventDefault();
                        navigate(index + (event.key === "ArrowLeft" ? -1 : 1));
                    }
                }}
            >
                <div className="viewer-heading">
                    <div>
                        <p className="eyebrow" role="status">
                            {index + 1} {labels.position} {images.length}
                        </p>
                        <h2 id={titleId}>{image?.title}</h2>
                    </div>
                    <button
                        type="button"
                        className="icon-button"
                        aria-label={labels.close}
                        autoFocus
                        onClick={() => dialog.current?.close()}
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>
                <div className="viewer-toolbar">
                    <button
                        type="button"
                        className="button button-small button-outline"
                        disabled={index === 0}
                        onClick={() => navigate(index - 1)}
                    >
                        <ArrowLeft size={16} aria-hidden="true" /> {labels.previous}
                    </button>
                    <button
                        type="button"
                        className="button button-small button-outline"
                        disabled={index === images.length - 1}
                        onClick={() => navigate(index + 1)}
                    >
                        {labels.next} <ArrowRight size={16} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="button button-small button-outline"
                        aria-pressed={originalSize}
                        onClick={() => {
                            setOriginalSize(!originalSize);
                            viewport.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
                        }}
                    >
                        {originalSize ? (
                            <Minimize size={16} aria-hidden="true" />
                        ) : (
                            <Maximize size={16} aria-hidden="true" />
                        )}
                        {originalSize ? labels.fit : labels.originalSize}
                    </button>
                    <a
                        href={image?.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                    >
                        {labels.original} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                </div>
                <div
                    ref={viewport}
                    className={clsx("viewer-viewport", { "viewer-original-size": originalSize })}
                    tabIndex={0}
                    role="region"
                    aria-label={image?.alt}
                >
                    {hasOpened && image && (
                        <Image
                            key={image.src}
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            unoptimized
                            loading="eager"
                            style={
                                originalSize
                                    ? { width: image.width, height: image.height }
                                    : undefined
                            }
                        />
                    )}
                </div>
                <div className="viewer-caption">
                    {image?.caption && <p>{image.caption}</p>}
                    {notice && <p className="viewer-notice">{notice}</p>}
                    <p className="viewer-scroll-hint" aria-live="polite">
                        {originalSize ? labels.scrollHint : ""}
                    </p>
                </div>
            </dialog>
        </div>
    );
}
