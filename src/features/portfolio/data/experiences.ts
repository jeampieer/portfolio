import { existsSync } from "node:fs";
import path from "node:path";
import type { ProfessionalExperience } from "@/features/portfolio/types/portfolio.types";

export const experiences: ProfessionalExperience[] = [
    {
        id: "utp",
        publisher: "Egresados UTP",
        category: { es: "COMUNIDAD UNIVERSITARIA", en: "UNIVERSITY COMMUNITY" },
        title: {
            es: "Un hito compartido por mi universidad",
            en: "A milestone shared by my university",
        },
        description: {
            es: "La página de Egresados UTP compartió esta fotografía junto a una felicitación a estudiantes y egresados. Un recuerdo de mi camino profesional, publicado por mi comunidad universitaria.",
            en: "The Egresados UTP page shared this photograph alongside a message congratulating students and graduates. A memory from my professional journey, published by my university community.",
        },
        imageFile: "utp-linkedin.png",
        imageAlt: {
            es: "Captura completa de LinkedIn: publicación de Egresados UTP con una felicitación y una fotografía grupal en TCS.",
            en: "Full LinkedIn screenshot: an Egresados UTP post with a congratulatory message and a group photograph at TCS.",
        },
    },
    {
        id: "igh",
        publisher: "IGH · Inveritas Global Holdings",
        category: { es: "ENTORNO PROFESIONAL", en: "PROFESSIONAL COMMUNITY" },
        title: { es: "Un momento compartido por mi empresa", en: "A moment shared by my company" },
        description: {
            es: "IGH, la empresa donde trabajo, publicó esta fotografía de equipo en su stand del XXVIII Seminario Internacional de Seguridad Minera. Una mirada al entorno profesional del que formo parte.",
            en: "IGH, the company where I work, published this team photograph at its stand during the 28th International Mining Safety Seminar. A glimpse of the professional environment I am part of.",
        },
        imageFile: "igh-linkedin.png",
        imageAlt: {
            es: "Captura completa de LinkedIn: publicación de IGH sobre el XXVIII Seminario Internacional de Seguridad Minera, con una fotografía de equipo en su stand.",
            en: "Full LinkedIn screenshot: an IGH post about the 28th International Mining Safety Seminar, with a team photograph at its stand.",
        },
    },
];

// Resolve only files supplied by the owner. Missing captures never produce broken image requests.
export function getExperienceImage(imageFile: string): string | null {
    const publicPath = `/images/experiences/${imageFile}`;
    return existsSync(path.join(process.cwd(), "public", publicPath)) ? publicPath : null;
}
