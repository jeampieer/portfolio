import type { Dictionary } from "@/lib/i18n";

export const portfolioNavigation = [
    { id: "projects", label: "projects", primary: true },
    { id: "about", label: "about", primary: true },
    { id: "education", label: "education", primary: true },
    { id: "stack", label: "stack", primary: true },
    { id: "experiences", label: "experiences", primary: false },
    { id: "labs", label: "labs", primary: false },
    { id: "contact", label: "contact", primary: true },
] as const satisfies readonly {
    id: string;
    label: keyof Dictionary["nav"];
    primary: boolean;
}[];

export type PortfolioSection = (typeof portfolioNavigation)[number]["id"];
