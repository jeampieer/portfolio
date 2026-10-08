import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n";

export function Footer({ locale, labels }: { locale: Locale; labels: Dictionary["footer"] }) {
    return (
        <footer className="site-footer container">
            <Brand locale={locale} />
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
