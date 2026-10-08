import { Hero } from "@/features/portfolio/components/Hero";
import { IdentitySignal } from "@/features/portfolio/components/IdentitySignal";
import { OrbitalTimeline } from "@/features/portfolio/components/OrbitalTimeline";
import { MissionArchive } from "@/features/portfolio/components/MissionArchive";
import { EngineeringArsenal } from "@/features/portfolio/components/EngineeringArsenal";
import { OrbitalLab } from "@/features/portfolio/components/OrbitalLab";
import { Contact } from "@/features/portfolio/components/Contact";
import { projects, skillGroups } from "@/features/portfolio/data/portfolio";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function PortfolioView({ locale }: { locale: Locale }) {
    const dictionary = getDictionary(locale);
    return (
        <>
            <Hero labels={dictionary.hero} />
            <IdentitySignal labels={dictionary.about} />
            <OrbitalTimeline labels={dictionary.timeline} />
            <MissionArchive
                projects={projects.filter((project) => project.showInArchive !== false)}
                labels={dictionary.projects}
                locale={locale}
            />
            <EngineeringArsenal labels={dictionary.stack} groups={skillGroups} locale={locale} />
            <OrbitalLab labels={dictionary.labs} />
            <Contact labels={dictionary.contact} />
        </>
    );
}
