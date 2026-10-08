import type { Localized } from "@/types/i18n";

export type ProjectCategory = "frontend" | "backend" | "fullstack";
export interface ProfessionalExperience {
    id: string;
    publisher: string;
    category: Localized<string>;
    title: Localized<string>;
    description: Localized<string>;
    imageFile: string;
    imageAlt: Localized<string>;
}

export interface ProjectImage {
    src: string;
    width: number;
    height: number;
    title: Localized<string>;
    alt: Localized<string>;
    caption?: Localized<string>;
}

export interface Project {
    slug: string;
    number: string;
    title: Localized<string>;
    category: ProjectCategory;
    showInArchive?: boolean;
    year?: string;
    context?: Localized<string>;
    artwork?: "orbital-signal";
    cover?: ProjectImage;
    tags: string[];
    description: Localized<string>;
    problem: Localized<string>;
    participation?: Localized<string>;
    architecture: Localized<string>;
    decisions?: Localized<string>;
    impact: Localized<string>;
    learnings: Localized<string>;
    features?: { title: Localized<string>; description: Localized<string> }[];
    galleryNotice?: Localized<string>;
    gallery: ProjectImage[];
    demoUrl?: string;
    repositoryUrl?: string;
}

export interface SkillGroup {
    id: "frontend" | "backend" | "database" | "cloud" | "ai" | "tools";
    label: Localized<string>;
    items: string[];
}
