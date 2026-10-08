import type { Locale } from "@/types/i18n";
import { siteConfig } from "@/config/site";

const es = {
    meta: {
        title: "{name} — Desarrollador Full Stack",
        description:
            "Desarrollo de software full stack. Explora mis proyectos, mi forma de construir y el universo de JEAMPIEER.TECH.",
    },
    nav: {
        about: "Sobre mí",
        projects: "Proyectos",
        stack: "Stack",
        labs: "Labs",
        contact: "Hablemos",
        cv: "Descargar CV",
        open: "Abrir menú",
        close: "Cerrar menú",
        label: "Navegación principal",
        language: "Read in English",
        light: "Activar tema claro",
        dark: "Activar tema oscuro",
        skip: "Saltar al contenido",
    },
    hero: {
        eyebrow: "DESARROLLADOR DE SOFTWARE FULL STACK",
        intro: "Hola, soy {name}.",
        title: "Ideas que toman",
        accent: "forma en código.",
        description:
            "Conecto diseño y tecnología para construir experiencias digitales claras, cuidadas y con propósito.",
        projects: "Explorar proyectos",
        about: "Conóceme",
        scroll: "SIGUE LA SEÑAL",
        note: "DEL CONCEPTO A LA EXPERIENCIA",
        orbit: "INGENIERÍA × CREATIVIDAD",
        caption: "Un universo de posibilidades.",
    },
    about: {
        eyebrow: "01 / IDENTITY SIGNAL",
        title: "Más allá del código.",
        description: "La curiosidad marca el rumbo. La ingeniería hace posible el viaje.",
        cards: [
            {
                title: "El desarrollador",
                body: "Soy desarrollador de software full stack. Me interesa conectar cada parte de un producto en una experiencia coherente.",
            },
            {
                title: "Lo que me importa",
                body: "Claridad en las decisiones, atención al detalle y código que sea fácil de entender y mantener.",
            },
            {
                title: "Lo que me inspira",
                body: "La intersección entre tecnología, diseño y los universos de la ciencia ficción. Siempre hay algo más por explorar.",
            },
            {
                title: "Mi misión actual",
                body: "Dar forma a este espacio: una bitácora de proyectos, ideas y nuevas exploraciones en software.",
            },
        ],
    },
    timeline: {
        eyebrow: "02 / ORBITAL TIMELINE",
        title: "Una idea. Un camino.",
        description: "Mi enfoque para pasar de una pregunta a una experiencia funcional.",
        steps: [
            {
                label: "01 — ENTENDER",
                title: "Encontrar el problema correcto",
                body: "Comprender el contexto, escuchar y definir qué necesita resolver el producto.",
            },
            {
                label: "02 — CONSTRUIR",
                title: "Diseñar con intención",
                body: "Conectar arquitectura e interfaz, avanzar por partes y cuidar cada interacción.",
            },
            {
                label: "03 — EVOLUCIONAR",
                title: "Verificar, aprender, mejorar",
                body: "Probar lo construido, documentar las decisiones y dejar espacio para lo que sigue.",
            },
        ],
    },
    projects: {
        eyebrow: "03 / MISSION ARCHIVE",
        title: "Ideas en órbita.",
        description: "Una mirada a lo que construyo y a las decisiones detrás del código.",
        all: "Todos",
        frontend: "Frontend",
        backend: "Backend",
        fullstack: "Full stack",
        filters: "Filtrar proyectos",
        empty: "Aún no hay proyectos publicados en esta categoría.",
        detail: "Explorar proyecto",
        back: "Volver a proyectos",
        featured: "PROYECTO DESTACADO",
        type: "PORTAFOLIO PERSONAL",
        nextTitle: "El próximo capítulo",
        nextDescription:
            "Nuevos proyectos encontrarán su lugar aquí. Mientras tanto, puedes explorar el laboratorio.",
        nextLink: "Ir al laboratorio",
        problem: "El punto de partida",
        participation: "Mi participación",
        architecture: "La arquitectura",
        decisions: "Decisiones de ingeniería",
        impact: "El resultado",
        learnings: "Lo aprendido",
        gallery: "Galería",
        features: "Funcionalidades principales",
        openImage: "Abrir captura original",
        demo: "Visitar proyecto",
        repository: "Ver código",
        system: "Sistema visual",
        preview: "Vista conceptual del sistema visual de Orbital Signal",
    },
    stack: {
        eyebrow: "04 / ENGINEERING ARSENAL",
        title: "Las herramientas del viaje.",
        description:
            "Cada herramienta tiene un propósito. Este es mi stack para desarrollar aplicaciones full stack.",
        note: "AWS: conocimientos básicos para desplegar aplicaciones.",
    },
    labs: {
        eyebrow: "05 / LABS",
        title: "Un espacio para explorar.",
        description: "Pequeñas ideas, interacciones reales. La curiosidad también se construye.",
        titleCard: "Orbital playground",
        descriptionCard:
            "Explora el movimiento de una señal. Cambia la velocidad, elige su trayectoria o detén el tiempo.",
        speed: "Velocidad orbital",
        orbit: "Trayectoria",
        circular: "Circular",
        elliptical: "Elíptica",
        pause: "Pausar animación",
        play: "Reanudar animación",
        reduced: "Movimiento reducido activo: la señal permanece estática.",
        live: "EXPERIMENTO INTERACTIVO",
        caption: "FRAMER MOTION / CSS / CURIOSIDAD",
        reset: "Restablecer",
    },
    contact: {
        eyebrow: "06 / OPEN CHANNEL",
        title: "La próxima gran idea",
        accent: "empieza conversando.",
        description:
            "Un proyecto, una colaboración o una buena conversación sobre tecnología. Todo empieza con una señal.",
        email: "Escríbeme",
        copy: "Copiar correo",
        copied: "Correo copiado",
        failed: "No se pudo copiar. Puedes seleccionar el correo.",
        pending: "Pronto abriré este canal de contacto.",
        back: "Volver al inicio",
    },
    footer: { line: "Construido con intención. Siempre en evolución.", top: "Volver arriba" },
    notFound: {
        title: "Esta señal no llegó.",
        description: "La página que buscas no está en esta órbita.",
        back: "Volver al inicio",
    },
};

export type Dictionary = typeof es;

const en: Dictionary = {
    meta: {
        title: "{name} — Full Stack Developer",
        description:
            "Full stack software development. Explore my projects, my approach to building and the world of JEAMPIEER.TECH.",
    },
    nav: {
        about: "About",
        projects: "Projects",
        stack: "Stack",
        labs: "Labs",
        contact: "Let's talk",
        cv: "Download CV",
        open: "Open menu",
        close: "Close menu",
        label: "Main navigation",
        language: "Leer en español",
        light: "Switch to light theme",
        dark: "Switch to dark theme",
        skip: "Skip to content",
    },
    hero: {
        eyebrow: "FULL STACK SOFTWARE DEVELOPER",
        intro: "Hi, I'm {name}.",
        title: "Ideas brought",
        accent: "to life in code.",
        description:
            "I connect design and technology to build digital experiences with clarity, care and purpose.",
        projects: "Explore projects",
        about: "Get to know me",
        scroll: "FOLLOW THE SIGNAL",
        note: "FROM CONCEPT TO EXPERIENCE",
        orbit: "ENGINEERING × CREATIVITY",
        caption: "A universe of possibilities.",
    },
    about: {
        eyebrow: "01 / IDENTITY SIGNAL",
        title: "Beyond the code.",
        description: "Curiosity sets the course. Engineering makes the journey possible.",
        cards: [
            {
                title: "The developer",
                body: "I'm a full stack software developer. I care about connecting every part of a product into a coherent experience.",
            },
            {
                title: "What matters to me",
                body: "Clear decisions, attention to detail and code that is easy to understand and maintain.",
            },
            {
                title: "What inspires me",
                body: "The intersection of technology, design and the worlds of science fiction. There is always more to explore.",
            },
            {
                title: "My current mission",
                body: "Shaping this space: a logbook of projects, ideas and new explorations in software.",
            },
        ],
    },
    timeline: {
        eyebrow: "02 / ORBITAL TIMELINE",
        title: "One idea. A way forward.",
        description: "My approach to turning a question into a working experience.",
        steps: [
            {
                label: "01 — UNDERSTAND",
                title: "Find the right problem",
                body: "Understand the context, listen and define what the product needs to solve.",
            },
            {
                label: "02 — BUILD",
                title: "Design with intention",
                body: "Connect architecture and interface, build incrementally and care for every interaction.",
            },
            {
                label: "03 — EVOLVE",
                title: "Verify, learn, improve",
                body: "Test what was built, document decisions and leave room for what comes next.",
            },
        ],
    },
    projects: {
        eyebrow: "03 / MISSION ARCHIVE",
        title: "Ideas in orbit.",
        description: "A look at what I build and the decisions behind the code.",
        all: "All",
        frontend: "Frontend",
        backend: "Backend",
        fullstack: "Full stack",
        filters: "Filter projects",
        empty: "No projects have been published in this category yet.",
        detail: "Explore project",
        back: "Back to projects",
        featured: "FEATURED PROJECT",
        type: "PERSONAL PORTFOLIO",
        nextTitle: "The next chapter",
        nextDescription:
            "New projects will find their place here. In the meantime, explore the playground.",
        nextLink: "Visit the lab",
        problem: "The starting point",
        participation: "My contribution",
        architecture: "The architecture",
        decisions: "Engineering decisions",
        impact: "The outcome",
        learnings: "What I learned",
        gallery: "Gallery",
        features: "Key features",
        openImage: "Open original screenshot",
        demo: "Visit project",
        repository: "View code",
        system: "Visual system",
        preview: "Conceptual preview of the Orbital Signal visual system",
    },
    stack: {
        eyebrow: "04 / ENGINEERING ARSENAL",
        title: "Tools for the journey.",
        description:
            "Every tool has a purpose. This is my stack for developing full stack applications.",
        note: "AWS: basic knowledge for deploying applications.",
    },
    labs: {
        eyebrow: "05 / LABS",
        title: "Room to explore.",
        description: "Small ideas, real interactions. Curiosity can be built, too.",
        titleCard: "Orbital playground",
        descriptionCard:
            "Explore a signal in motion. Change its speed, choose a trajectory or pause time.",
        speed: "Orbital speed",
        orbit: "Trajectory",
        circular: "Circular",
        elliptical: "Elliptical",
        pause: "Pause animation",
        play: "Resume animation",
        reduced: "Reduced motion is enabled: the signal remains still.",
        live: "INTERACTIVE EXPERIMENT",
        caption: "FRAMER MOTION / CSS / CURIOSITY",
        reset: "Reset",
    },
    contact: {
        eyebrow: "06 / OPEN CHANNEL",
        title: "The next great idea",
        accent: "starts with a conversation.",
        description:
            "A project, a collaboration or a good conversation about technology. It all starts with a signal.",
        email: "Get in touch",
        copy: "Copy email",
        copied: "Email copied",
        failed: "Could not copy. You can select the email address.",
        pending: "This contact channel will be opening soon.",
        back: "Back to top",
    },
    footer: { line: "Built with intention. Always evolving.", top: "Back to top" },
    notFound: {
        title: "This signal didn't arrive.",
        description: "The page you are looking for is outside this orbit.",
        back: "Back to home",
    },
};

export function getDictionary(locale: Locale): Dictionary {
    const dictionary = locale === "en" ? en : es;
    return {
        ...dictionary,
        meta: {
            ...dictionary.meta,
            title: dictionary.meta.title.replace("{name}", siteConfig.name),
        },
        hero: {
            ...dictionary.hero,
            intro: dictionary.hero.intro.replace("{name}", siteConfig.name),
        },
    };
}
