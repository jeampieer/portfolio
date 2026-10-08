"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { portfolioNavigation, type PortfolioSection } from "@/features/portfolio/data/navigation";

export function useSectionNavigation() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<PortfolioSection | "">("");
    const [scrolled, setScrolled] = useState(false);
    const isProject = /^\/(es|en)\/projects\/[^/]+$/.test(pathname);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            setScrolled(window.scrollY > 24);
            const threshold =
                (document.querySelector(".site-header")?.getBoundingClientRect().height ?? 88) + 80;
            let active: PortfolioSection | "" = "";
            for (const item of portfolioNavigation) {
                const section = document.getElementById(item.id);
                if (section && section.getBoundingClientRect().top <= threshold) active = item.id;
            }
            if (
                window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8 &&
                document.getElementById("contact")
            )
                active = "contact";
            setActiveSection(active);
            frame = 0;
        };
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };
        const resizeObserver = new ResizeObserver(schedule);
        const main = document.querySelector("main");
        if (main) resizeObserver.observe(main);
        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        window.addEventListener("hashchange", schedule);
        return () => {
            resizeObserver.disconnect();
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.removeEventListener("hashchange", schedule);
        };
    }, [pathname]);
    return { activeSection: isProject ? "projects" : activeSection, scrolled };
}
