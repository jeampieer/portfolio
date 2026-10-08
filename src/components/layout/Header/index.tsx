"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Brand } from "@/components/ui/Brand";
import { siteConfig } from "@/config/site";
import { portfolioNavigation } from "@/features/portfolio/data/navigation";
import { useSectionNavigation } from "@/features/portfolio/hooks/useSectionNavigation";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

function subscribeHash(callback: () => void) {
    window.addEventListener("hashchange", callback);
    window.addEventListener("popstate", callback);
    return () => {
        window.removeEventListener("hashchange", callback);
        window.removeEventListener("popstate", callback);
    };
}

export function Header({ locale, labels }: { locale: Locale; labels: Dictionary["nav"] }) {
    const header = useRef<HTMLElement>(null);
    const compactMenu = useRef<HTMLDetailsElement>(null);
    const moreMenu = useRef<HTMLDetailsElement>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const { activeSection, scrolled } = useSectionNavigation();
    const pathname = usePathname();
    const hash = useSyncExternalStore(
        subscribeHash,
        () => window.location.hash,
        () => ""
    );
    const otherLocale = locale === "es" ? "en" : "es";
    const alternate = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${otherLocale}`);
    const secondaryActive = portfolioNavigation.some(
        (item) => !item.primary && item.id === activeSection
    );

    function closeMenus() {
        if (compactMenu.current) compactMenu.current.open = false;
        if (moreMenu.current) moreMenu.current.open = false;
    }

    useEffect(() => {
        const escape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            const openMenu = [compactMenu.current, moreMenu.current].find((menu) => menu?.open);
            if (openMenu) {
                openMenu.open = false;
                openMenu.querySelector("summary")?.focus();
            }
        };
        const outside = (event: PointerEvent) => {
            if (!header.current?.contains(event.target as Node)) closeMenus();
        };
        const resize = () => closeMenus();
        document.addEventListener("keydown", escape);
        document.addEventListener("pointerdown", outside);
        window.addEventListener("resize", resize);
        return () => {
            document.removeEventListener("keydown", escape);
            document.removeEventListener("pointerdown", outside);
            window.removeEventListener("resize", resize);
        };
    }, []);

    function sectionLink(item: (typeof portfolioNavigation)[number]) {
        return (
            <a
                key={item.id}
                href={`/${locale}#${item.id}`}
                className={clsx({ active: activeSection === item.id })}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => {
                    closeMenus();
                    // A closed disclosure must not leave keyboard focus inside hidden content.
                    if (pathname === `/${locale}`) {
                        const section = document.getElementById(item.id);
                        const heading = section?.querySelector<HTMLElement>("h2");
                        if (heading) {
                            heading.tabIndex = -1;
                            heading.focus({ preventScroll: true });
                        }
                    }
                }}
            >
                {labels[item.label]}
            </a>
        );
    }

    return (
        <header ref={header} className={clsx("site-header", { scrolled })}>
            <div className="container header-inner">
                <Brand locale={locale} />
                <nav aria-label={labels.label} className="desktop-navigation">
                    {portfolioNavigation.filter((item) => item.primary).map(sectionLink)}
                    <details ref={moreMenu} className="more-menu">
                        <summary className={clsx({ active: secondaryActive })}>
                            {labels.more}
                            <ChevronDown size={14} aria-hidden="true" />
                        </summary>
                        <div className="more-links">
                            {portfolioNavigation.filter((item) => !item.primary).map(sectionLink)}
                        </div>
                    </details>
                </nav>
                <div className="header-controls">
                    {/* Locale root documents use a full navigation so their theme scripts are not
                        rendered again by a client transition. Hashes remain ordinary HTML anchors. */}
                    <a
                        href={`${alternate}${hash}`}
                        hrefLang={otherLocale}
                        aria-label={labels.language}
                        className="language-switch"
                        onClick={(event) => {
                            event.currentTarget.href = `${alternate}${window.location.search}${window.location.hash}`;
                            closeMenus();
                        }}
                    >
                        <span className={locale === "es" ? "selected" : ""}>ES</span>
                        <span className="language-divider">/</span>
                        <span className={locale === "en" ? "selected" : ""}>EN</span>
                    </a>
                    <button
                        type="button"
                        className="icon-button theme-switch"
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="theme-sun" size={17} aria-hidden="true" />
                        <Moon className="theme-moon" size={17} aria-hidden="true" />
                        <span className="sr-only theme-sun">{labels.light}</span>
                        <span className="sr-only theme-moon">{labels.dark}</span>
                    </button>
                    <a
                        className="button button-small button-outline header-cta"
                        href={siteConfig.cv || `/${locale}#contact`}
                        download={siteConfig.cv ? true : undefined}
                    >
                        {siteConfig.cv ? labels.cv : labels.contact}
                        {siteConfig.cv ? (
                            <Download size={14} aria-hidden="true" />
                        ) : (
                            <ArrowUpRight size={14} aria-hidden="true" />
                        )}
                    </a>
                    <details ref={compactMenu} className="compact-menu">
                        <summary className="icon-button" aria-controls="compact-navigation">
                            <Menu className="menu-open-icon" size={20} aria-hidden="true" />
                            <X className="menu-close-icon" size={20} aria-hidden="true" />
                            <span className="sr-only menu-open-icon">{labels.open}</span>
                            <span className="sr-only menu-close-icon">{labels.close}</span>
                        </summary>
                        <nav
                            aria-label={labels.label}
                            id="compact-navigation"
                            className="compact-navigation"
                        >
                            {portfolioNavigation.map(sectionLink)}
                            {siteConfig.cv && (
                                <a
                                    href={siteConfig.cv}
                                    download
                                    className="compact-cv"
                                    onClick={closeMenus}
                                >
                                    {labels.cv}
                                    <Download size={16} aria-hidden="true" />
                                </a>
                            )}
                        </nav>
                    </details>
                </div>
            </div>
        </header>
    );
}
