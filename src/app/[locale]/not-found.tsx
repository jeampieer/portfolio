"use client";

import { useParams } from "next/navigation";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/types/i18n";

export default function NotFound() {
    const params = useParams();
    const locale =
        typeof params.locale === "string" && isLocale(params.locale) ? params.locale : "es";
    return (
        <NotFoundContent
            locale={locale}
            labels={getDictionary(locale).notFound}
            global={typeof params.locale !== "string" || !isLocale(params.locale)}
        />
    );
}
