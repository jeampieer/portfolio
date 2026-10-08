"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Brand } from "@/components/ui/Brand";
import { siteConfig } from "@/config/site";
import { useSectionNavigation } from "@/features/portfolio/hooks/useSectionNavigation";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function Header({ locale, labels }: { locale: Locale; labels: Dictionary["nav"] }) {
    const [open, setOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const { activeSection, scrolled } = useSectionNavigation();
    const pathname = usePathname();
    const otherLocale = locale === "es" ? "en" : "es";
    const alternate = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${otherLocale}`);
    const links = [
        { id: "about", label: labels.about },
        { id: "projects", label: labels.projects },
        { id: "stack", label: labels.stack },
        { id: "labs", label: labels.labs },
    ];

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && open) {
                setOpen(false);
                menuButton.current?.focus();
            }
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [open]);

    return (
        <header className={clsx("site-header", { scrolled })}>
            <div className="container header-inner">
                <Brand locale={locale} />
                <nav
                    aria-label={labels.label}
                    className={clsx("main-nav", { "is-open": open })}
                    id="main-navigation"
                >
                    {links.map(({ id, label }) => (
                        <Link
                            key={id}
                            href={`/${locale}#${id}`}
                            className={clsx({ active: activeSection === id })}
                            aria-current={activeSection === id ? "location" : undefined}
                            onClick={() => setOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="header-controls">
                    <Link
                        href={alternate}
                        hrefLang={otherLocale}
                        aria-label={labels.language}
                        className="language-switch"
                        onClick={() => setOpen(false)}
                    >
                        <span className={locale === "es" ? "selected" : ""}>ES</span>
                        <span className="language-divider">/</span>
                        <span className={locale === "en" ? "selected" : ""}>EN</span>
                    </Link>
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
                    <Link
                        className="button button-small button-outline header-cta"
                        href={siteConfig.cv || `/${locale}#contact`}
                        download={siteConfig.cv ? true : undefined}
                    >
                        {siteConfig.cv ? labels.cv : labels.contact}
                        {siteConfig.cv ? <Download size={14} /> : <ArrowUpRight size={14} />}
                    </Link>
                    <button
                        type="button"
                        ref={menuButton}
                        className="icon-button menu-toggle"
                        aria-expanded={open}
                        aria-controls="main-navigation"
                        aria-label={open ? labels.close : labels.open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
}
