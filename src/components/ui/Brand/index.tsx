import type { Locale } from "@/types/i18n";

export function Brand({ locale }: { locale: Locale }) {
    return (
        <a className="brand" href={`/${locale}#top`} aria-label="JEAMPIEER.TECH — Home">
            <span className="brand-mark" aria-hidden="true">
                j<span>.</span>
            </span>
            <span>
                JEAMPIEER<span className="brand-suffix">.TECH</span>
            </span>
        </a>
    );
}
