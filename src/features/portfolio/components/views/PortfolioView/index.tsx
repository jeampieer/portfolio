import { Hero } from "@/features/portfolio/components/Hero";
import { IdentitySignal } from "@/features/portfolio/components/IdentitySignal";
import { MissionArchive } from "@/features/portfolio/components/MissionArchive";
import { ProfessionalExperiences } from "@/features/portfolio/components/ProfessionalExperiences";
import { Education } from "@/features/portfolio/components/Education";
import { EngineeringArsenal } from "@/features/portfolio/components/EngineeringArsenal";
import { OrbitalLab } from "@/features/portfolio/components/OrbitalLab";
import { Contact } from "@/features/portfolio/components/Contact";
import { archiveProjects, skillGroups } from "@/features/portfolio/data/portfolio";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

export function PortfolioView({ locale }: { locale: Locale }) {
    const dictionary = getDictionary(locale);
    return (
        <>
            <Hero labels={dictionary.hero} />
            <MissionArchive
                projects={archiveProjects}
                labels={dictionary.projects}
                locale={locale}
            />
            <IdentitySignal labels={dictionary.about} processLabels={dictionary.timeline} />
            <Education labels={dictionary.education} locale={locale} />
            <EngineeringArsenal labels={dictionary.stack} groups={skillGroups} locale={locale} />
            <ProfessionalExperiences labels={dictionary.experiences} locale={locale} />
            <OrbitalLab labels={dictionary.labs} />
            <Contact labels={dictionary.contact} />
        </>
    );
}
