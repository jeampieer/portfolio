/* eslint-disable @next/next/no-html-link-for-pages -- Recovery links load the localized root document and its language/layout after a global 404. */
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function NotFoundContent({
    locale,
    labels,
    global = false,
}: {
    locale: Locale;
    labels: Dictionary["notFound"];
    global?: boolean;
}) {
    return (
        <div className="not-found container">
            <Brand locale={locale} />
            <p className="eyebrow">404 / SIGNAL LOST</p>
            <h1>{labels.title}</h1>
            <p>{labels.description}</p>
            <div className="not-found-actions">
                {global ? (
                    <>
                        <a className="button button-primary" href="/es" lang="es">
                            {labels.spanish}
                            <ArrowLeft size={16} aria-hidden="true" />
                        </a>
                        <a className="button button-outline" href="/en" lang="en">
                            {labels.english}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    </>
                ) : (
                    <>
                        <a className="button button-primary" href={`/${locale}`}>
                            <ArrowLeft size={16} aria-hidden="true" />
                            {labels.back}
                        </a>
                        <a className="button button-outline" href={`/${locale}#projects`}>
                            {labels.projects}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
