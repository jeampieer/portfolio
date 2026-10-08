"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/types/i18n";

export default function NotFound() {
    const params = useParams();
    const locale =
        typeof params.locale === "string" && isLocale(params.locale) ? params.locale : "es";
    const labels = getDictionary(locale).notFound;
    return (
        <div className="not-found container">
            <p className="eyebrow">404 / SIGNAL LOST</p>
            <h1>{labels.title}</h1>
            <p>{labels.description}</p>
            <Link href={`/${locale}`} className="button button-primary">
                <ArrowLeft size={16} />
                {labels.back}
            </Link>
        </div>
    );
}
