import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/types/i18n";
import { projects } from "@/features/portfolio/data/portfolio";

// Keep recovery HTML on the server: this Next version mounts a thrown root fallback
// only on the client for unknown generated parameters. Pages render the recovery view.
export function proxy(request: NextRequest) {
    const segments = request.nextUrl.pathname.split("/").filter(Boolean);
    const [locale, section, slug] = segments;
    if (!locale) return NextResponse.next();
    if (
        !isLocale(locale) ||
        (section === "projects" &&
            segments.length === 3 &&
            !projects.some((project) => project.slug === slug))
    ) {
        return NextResponse.next({ status: 404 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/|images/|documents/|icon\\.svg$|robots\\.txt$|sitemap\\.xml$).*)"],
};
