"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
    const reduced = useReducedMotion();
    return (
        <m.div
            className={className}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            onViewportEnter={(entry) => {
                if (!reduced)
                    entry?.target.animate(
                        [
                            { opacity: 0.65, transform: "translateY(24px)" },
                            { opacity: 1, transform: "translateY(0)" },
                        ],
                        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
                    );
            }}
        >
            {children}
        </m.div>
    );
}
