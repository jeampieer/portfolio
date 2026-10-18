import type { ProjectImage } from "@/features/portfolio/types/portfolio.types";

export const ipercGallery: ProjectImage[] = [
    {
        src: "/images/projects/iperc-antapaccay/01-tableros.png",
        width: 1920,
        height: 1080,
        title: { es: "Tableros de control de tareas", en: "Task control boards" },
        alt: {
            es: "Panel de IPERC Antapaccay con filtros y listado de tableros de control de tareas con datos sintéticos.",
            en: "IPERC Antapaccay panel with filters and a task control board list using synthetic data.",
        },
        caption: {
            es: "Consulta de tableros en la interfaz real. Los registros proceden de respuestas de API simuladas.",
            en: "Board lookup in the real interface. Records come from simulated API responses.",
        },
    },
    {
        src: "/images/projects/iperc-antapaccay/02-detalle-riesgos.png",
        width: 1920,
        height: 1080,
        title: { es: "Detalle de tareas y matriz de riesgo", en: "Task details and risk matrix" },
        alt: {
            es: "Detalle de un tablero sintético con tareas y matriz de riesgo 5×5 en el panel de IPERC Antapaccay.",
            en: "Synthetic board details with tasks and a 5×5 risk matrix in the IPERC Antapaccay panel.",
        },
        caption: {
            es: "Presentación de tareas y criterios de riesgo con datos sintéticos; no verifica el cálculo del backend.",
            en: "Task and risk criteria presentation using synthetic data; it does not verify backend calculations.",
        },
    },
    {
        src: "/images/projects/iperc-antapaccay/03-reportes.png",
        width: 1920,
        height: 1080,
        title: { es: "Consulta de reportes", en: "Report lookup" },
        alt: {
            es: "Vista de reportes del control de tareas con filtros y resultados sintéticos en IPERC Antapaccay.",
            en: "IPERC Antapaccay task control report view with filters and synthetic results.",
        },
        caption: {
            es: "Consulta de reportes con respuestas de API simuladas. Los controles de exportación visibles no acreditan descargas reales.",
            en: "Report lookup with simulated API responses. Visible export controls do not demonstrate real downloads.",
        },
    },
];
