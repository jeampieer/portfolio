"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const ThemeToggleContext = createContext<(() => void) | null>(null);

export function useThemeToggle() {
    const toggle = useContext(ThemeToggleContext);
    if (!toggle) throw new Error("useThemeToggle requires AppProvider");
    return toggle;
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const toggleTheme = useCallback(
        () => setTheme((current) => (current === "dark" ? "light" : "dark")),
        []
    );

    return (
        <ThemeToggleContext value={toggleTheme}>
            <ThemeProvider
                attribute="data-theme"
                defaultTheme="dark"
                forcedTheme={theme}
                enableSystem={false}
                disableTransitionOnChange
            >
                <LazyMotion features={domAnimation} strict>
                    <MotionConfig reducedMotion="user">{children}</MotionConfig>
                </LazyMotion>
            </ThemeProvider>
        </ThemeToggleContext>
    );
}
