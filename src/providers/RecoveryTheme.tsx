"use client";

import { useEffect } from "react";

// Next may mount the root 404 on the client after rejecting a locale before its layout.
// Keep recovery documents dark without adding next-themes' inline bootstrap there.
export function RecoveryTheme() {
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.style.colorScheme = "dark";
    }, []);
    return null;
}
