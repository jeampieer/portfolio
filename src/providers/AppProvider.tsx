"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <LazyMotion features={domAnimation} strict>
                <MotionConfig reducedMotion="user">{children}</MotionConfig>
            </LazyMotion>
        </ThemeProvider>
    );
}
