"use client";

import { m } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { useReducedMotionPreference } from "@/features/portfolio/hooks/useMotionPreferences";

export function Reveal({
    children,
    className,
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduced = useReducedMotionPreference();
    const revealed = useRef(false);
    return (
        <m.div
            className={className}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            onViewportEnter={(entry) => {
                if (revealed.current) return;
                revealed.current = true;
                if (!reduced && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
                    entry?.target.animate(
                        [
                            { opacity: 0.65, transform: "translateY(24px)" },
                            { opacity: 1, transform: "translateY(0)" },
                        ],
                        {
                            duration: 400,
                            delay: Math.min(150, Math.max(0, delay)),
                            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        }
                    );
            }}
        >
            {children}
        </m.div>
    );
}
