"use client";

import { useSyncExternalStore } from "react";

function subscribeMotion(callback: () => void) {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
}

function subscribeVisibility(callback: () => void) {
    document.addEventListener("visibilitychange", callback);
    return () => document.removeEventListener("visibilitychange", callback);
}

// Stable server snapshots keep the prerendered markup and hydration consistent.
export function useReducedMotionPreference() {
    return useSyncExternalStore(
        subscribeMotion,
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        () => false
    );
}

export function usePageVisible() {
    return useSyncExternalStore(
        subscribeVisibility,
        () => !document.hidden,
        () => false
    );
}
