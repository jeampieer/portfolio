import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@/app/globals.css";
import { RecoveryTheme } from "@/providers/RecoveryTheme";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
    title: "404 · JEAMPIEER.TECH",
    robots: { index: false, follow: false },
    icons: { icon: "/icon.svg" },
};

export default function GlobalNotFound() {
    return (
        <html lang="es" suppressHydrationWarning>
            <body>
                <RecoveryTheme />
                <main>
                    <NotFoundContent locale="es" labels={getDictionary("es").notFound} global />
                </main>
            </body>
        </html>
    );
}
