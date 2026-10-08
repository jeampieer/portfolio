"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/features/portfolio/types/portfolio.types";

export function useProjectFilter(projects: Project[]) {
    const [filter, setFilter] = useState<ProjectCategory | "all">("all");
    const visibleProjects =
        filter === "all" ? projects : projects.filter((project) => project.category === filter);
    return { filter, setFilter, visibleProjects };
}
