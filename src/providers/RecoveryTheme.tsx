"use client";

import { useEffect } from "react";

// Next may mount the root 404 on the client after rejecting a locale before its layout.
// Restore the saved preference without next-themes' inline bootstrap script in that path.
export function RecoveryTheme() {
    useEffect(() => {
        try {
            const theme = localStorage.getItem("theme");
            document.documentElement.setAttribute(
                "data-theme",
                theme === "light" ? "light" : "dark"
            );
        } catch {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);
    return null;
}
