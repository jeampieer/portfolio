"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useSectionNavigation() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const updateScroll = () => setScrolled(window.scrollY > 24);
        updateScroll();
        window.addEventListener("scroll", updateScroll, { passive: true });
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-15% 0px -55% 0px" }
        );
        document
            .querySelectorAll("main section[id]")
            .forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", updateScroll);
        };
    }, [pathname]);
    return { activeSection, scrolled };
}
