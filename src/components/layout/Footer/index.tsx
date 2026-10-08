import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import type { Locale } from "@/types/i18n";
import { getDictionary, type Dictionary } from "@/lib/i18n";
import { portfolioNavigation } from "@/features/portfolio/data/navigation";

export function Footer({ locale, labels }: { locale: Locale; labels: Dictionary["footer"] }) {
    const { nav } = getDictionary(locale);
    return (
        <footer className="site-footer container">
            <Brand locale={locale} />
            <nav aria-label={nav.secondary} className="footer-navigation">
                {portfolioNavigation.map((item) => (
                    <a key={item.id} href={`/${locale}#${item.id}`}>
                        {nav[item.label]}
                    </a>
                ))}
            </nav>
            <p>
                © {new Date().getFullYear()} · {labels.line}
            </p>
            <a href="#top" className="footer-top">
                {labels.top}
                <ArrowUpRight size={16} />
            </a>
        </footer>
    );
}
