import type {
    EducationEntry,
    LanguageSkill,
    Project,
    SkillGroup,
} from "@/features/portfolio/types/portfolio.types";
import { gmSocialGallery } from "@/features/portfolio/data/gm-social-gallery";
import { mfaGallery } from "@/features/portfolio/data/mfa-gallery";

// Publish only the project details explicitly approved by the owner.
export const projects: Project[] = [
    {
        slug: "orbital-signal",
        showInArchive: false,
        number: "01",
        title: { es: "Orbital Signal", en: "Orbital Signal" },
        artwork: "orbital-signal",
        category: "frontend",
        year: "2026",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        description: {
            es: "Una identidad digital donde ingeniería y diseño comparten la misma órbita.",
            en: "A digital identity where engineering and design share the same orbit.",
        },
        problem: {
            es: "Crear un espacio personal para presentar proyectos de software, con una identidad coherente y contenido en dos idiomas.",
            en: "Create a personal space to showcase software projects, with a consistent identity and content in two languages.",
        },
        architecture: {
            es: "Next.js App Router, páginas prerenderizadas por idioma y organización por features. Componentes de servidor para el contenido y componentes cliente para las interacciones.",
            en: "Next.js App Router, prerendered locale pages and a feature-based structure. Server components for content and client components for interactions.",
        },
        impact: {
            es: "Una base bilingüe con temas claro y oscuro, navegación por teclado y contenido editable desde un único módulo. Sin métricas de uso publicadas todavía.",
            en: "A bilingual foundation with light and dark themes, keyboard navigation and content editable from one module. No usage metrics published yet.",
        },
        learnings: {
            es: "La identidad visual también es un sistema: tokens compartidos, tipografía consistente y movimiento que respeta las preferencias de accesibilidad.",
            en: "Visual identity is a system too: shared tokens, consistent typography and motion that respects accessibility preferences.",
        },
        gallery: [],
    },
    {
        slug: "servicio-mfa",
        number: "02",
        title: {
            es: "Servicio MFA para plataformas empresariales",
            en: "MFA service for enterprise platforms",
        },
        category: "backend",
        cover: mfaGallery[2],
        context: {
            es: "BACKEND EMPRESARIAL · PROYECTO PRIVADO",
            en: "ENTERPRISE BACKEND · PRIVATE PROJECT",
        },
        tags: ["Python", "Django", "Django REST Framework"],
        description: {
            es: "Reconstrucción y refactorización de un servicio de autenticación multifactor, con controles de plataforma y destinatario en los flujos de correo, y caché de configuración por plataforma.",
            en: "Reconstruction and refactoring of a multifactor authentication service, with platform and recipient checks in email flows, and caching of platform configuration.",
        },
        problem: {
            es: "Heredé un servicio MFA empresarial que había dejado de funcionar tras varios fallos. La documentación era insuficiente para seguir el flujo completo. Necesitaba entender el código existente y reorganizar el backend, incluidos el registro de usuarios y el envío de correos y códigos, para atender solicitudes de varias plataformas conectadas.",
            en: "I inherited an enterprise MFA service that had stopped working after several failures. The documentation was insufficient to follow the complete flow. I needed to understand the existing code and reorganize the backend, including user registration and email and code delivery, to handle requests from several connected platforms.",
        },
        participation: {
            es: "Primero estudié el código y reconstruí el flujo de principio a fin. Después rehíce y refactoricé el backend, extendí las validaciones y optimicé el registro de usuarios y el envío de correos y códigos. Mi participación se centró en reconstrucción, refactorización, validaciones y optimización. No desarrollé el servicio original. Despliegue inicial realizado por otro integrante del equipo.",
            en: "I first studied the code and reconstructed the flow from start to finish. I then rebuilt and refactored the backend, extended the validations and optimized user registration and email and code delivery. My contribution focused on reconstruction, refactoring, validation and optimization. I did not develop the original service. Initial deployment performed by another team member.",
        },
        architecture: {
            es: "El servicio es exclusivamente backend, desarrollado con Python, Django y Django REST Framework. En los flujos de correo identifica la plataforma solicitante y valida su clave, almacenada como hash. Consulta por API la plataforma de origen para contrastar el identificador y el correo del destinatario antes del envío. La infraestructura heredada, según el contexto del proyecto, ya estaba desplegada en AWS Lambda mediante Zappa y Terraform antes de mi intervención; ese despliegue no se verificó en la revisión local.",
            en: "The service is exclusively backend, built with Python, Django and Django REST Framework. In email flows it identifies the requesting platform and validates its key, stored as a hash. It queries the origin platform through an API to check the recipient's identifier and email before delivery. According to the project context, the inherited infrastructure had already been deployed to AWS Lambda through Zappa and Terraform before my involvement; that deployment was not verified in the local review.",
        },
        decisions: {
            es: "Extendí los controles de plataforma y clave en los flujos de correo. Antes del envío, el servicio consulta la API de origen para contrastar identificador y correo. Esta decisión buscaba reducir el uso indebido del envío de correos tras un antecedente de abuso. Añadí caché de configuración de plataforma en la autenticación para reutilizarla ante solicitudes del mismo origen. La verificación de correo invalida el código tras un uso correcto.",
            en: "I extended platform and key checks in email flows. Before delivery, the service queries the origin API to check the identifier and email. This decision aimed to reduce misuse of email delivery following a prior incident. I added platform configuration caching in authentication so it can be reused for requests from the same origin. Email verification invalidates the code after successful use.",
        },
        impact: {
            es: "El trabajo reorganizó el backend, el registro y el envío de correos alrededor de un flujo reconstruido. Siete pruebas HTTP locales con datos sintéticos comprobaron el registro, la aceptación e invalidación de un código vigente y los rechazos por código incorrecto o reutilizado, destinatario no coincidente, clave incorrecta y plataforma desconocida. Los rechazos no generaron nuevos correos. Estas pruebas no verifican la integración ni el despliegue de producción y no miden mejoras de rendimiento.",
            en: "The work reorganized the backend, registration and email delivery around a reconstructed flow. Seven local HTTP tests with synthetic data checked registration, acceptance and invalidation of a valid code, and rejection of an incorrect or reused code, mismatched recipient, incorrect key and unknown platform. Rejected requests did not generate additional emails. These tests do not verify production integration or deployment and do not measure performance improvements.",
        },
        learnings: {
            es: "Comprender un legado exige reconstruir el recorrido completo antes de cambiar sus partes. En un servicio compartido entre plataformas, los controles de acceso y la validación de destinatarios son responsabilidades distintas. La optimización empieza por reconocer qué configuración se puede reutilizar, y una prueba local debe distinguirse de la integración de producción.",
            en: "Understanding a legacy service requires reconstructing the complete flow before changing its parts. In a service shared across platforms, access checks and recipient validation are separate responsibilities. Optimization starts by recognizing which configuration can be reused, and a local test must be distinguished from production integration.",
        },
        galleryNotice: {
            es: "Capturas de un entorno local con datos sintéticos. Django Admin es la administración original; el cliente de prueba se creó para mostrar solicitudes reales al backend y no es una interfaz del producto.",
            en: "Screenshots from a local environment with synthetic data. Django Admin is the original administration interface; the test client was built to show real backend requests and is not a product interface.",
        },
        gallery: mfaGallery,
    },
    {
        slug: "plataforma-encuestas-gm",
        number: "03",
        title: {
            es: "GM Social — Gestión de estudios y trabajo de campo",
            en: "GM Social — Social study and fieldwork management",
        },
        category: "fullstack",
        context: {
            es: "FULL STACK EMPRESARIAL · PROYECTO PRIVADO",
            en: "ENTERPRISE FULL STACK · PRIVATE PROJECT",
        },
        cover: gmSocialGallery[0],
        tags: [
            "Next.js",
            "React",
            "TypeScript",
            "Ant Design",
            "TanStack Query",
            "Django REST Framework",
            "PostgreSQL",
        ],
        description: {
            es: "Plataforma full stack para configurar estudios sociales, coordinar asignaciones y supervisar la información recibida de campo, con instrumentos versionados, calidad y reportes.",
            en: "A full stack platform for configuring social studies, coordinating assignments and supervising incoming field data through versioned instruments, quality workflows and reporting.",
        },
        problem: {
            es: "Coordinar un estudio social exige mantener alineados los instrumentos, las metas territoriales y el trabajo del equipo. La plataforma reúne la planificación, la recepción de actividades, la supervisión y el análisis, distinguiendo lo capturado en campo de lo que ya llegó al servidor para su revisión.",
            en: "Running a social study requires keeping instruments, territorial targets and team assignments aligned. The platform brings together planning, incoming activities, supervision and analysis, distinguishing field capture from data already received by the server for review.",
        },
        participation: {
            es: "Desarrollé de principio a fin la API y el backoffice web, integrando contratos y flujos de administración, seguimiento y supervisión. Mi aporte full stack comprende la interfaz web, la lógica backend y su integración. El frontend parte de una plantilla existente. La aplicación móvil corresponde a otros compañeros.",
            en: "I developed the API and web backoffice from start to finish, integrating contracts and workflows for administration, monitoring and supervision. My full stack contribution covers the web interface, backend logic and their integration. The frontend builds on an existing template. The mobile application is handled by other team members.",
        },
        architecture: {
            es: "El backend modular Django REST Framework concentra reglas, permisos y transiciones sobre PostgreSQL. El backoffice utiliza Next.js, React y TypeScript, con Ant Design para la interfaz y TanStack Query para las consultas. La web integra la API mediante un proxy del servidor. El backend también implementa contratos de preparación y sincronización idempotente para el cliente móvil externo.",
            en: "A modular Django REST Framework backend centralizes business rules, permissions and state transitions over PostgreSQL. The backoffice uses Next.js, React and TypeScript, with Ant Design for the interface and TanStack Query for queries. The web integrates the API through a server proxy. The backend also implements preparation and idempotent synchronization contracts for an external mobile client.",
        },
        decisions: {
            es: "Las versiones publicadas de los instrumentos conservan el esquema al que pertenecen las respuestas históricas. Progreso, resultado de campo y revisión son estados distintos; los tiempos de captura y recepción también conservan significados separados. El backend aplica autorización por rol y alcance, incluidos los datos sensibles y las exportaciones. Reportes y bases exportadas comparten criterios de filtrado para mantener una lectura coherente.",
            en: "Published instrument versions preserve the schema associated with historical responses. Progress, field outcome and review are separate states; capture and receipt timestamps also retain distinct meanings. The backend enforces authorization by role and scope, including sensitive data and exports. Reports and exported datasets share filtering criteria to keep their interpretation consistent.",
        },
        impact: {
            es: "La demostración local permite recorrer planificación, consulta de actividades, supervisión y análisis con datos sintéticos persistidos. Se comprobaron el filtro territorial del dashboard, permisos por rol y exportaciones CSV/XLSX. La aceptación integral con Flutter, los instrumentos oficiales y la infraestructura productiva siguen pendientes. La vista de Google Maps no pudo validarse en el entorno local.",
            en: "The local demonstration supports a walkthrough of planning, activity lookup, supervision and analysis using persisted synthetic records. The dashboard's territorial filter, role-based permissions and CSV/XLSX exports were checked. End-to-end acceptance with Flutter, official instruments and production infrastructure remain pending. The Google Maps view could not be validated in the local environment.",
        },
        learnings: {
            es: "Un contrato compartido permite que web y móvil consuman las mismas reglas sin duplicarlas en cada cliente. Versionar los instrumentos y separar captura, recepción y revisión facilita interpretar la procedencia de la información. También aprendí a distinguir lo comprobado en una demo de lo que aún requiere aceptación e integración en el entorno final.",
            en: "A shared contract lets web and mobile consume the same rules without duplicating them in each client. Versioning instruments and separating capture, receipt and review makes the origin of information easier to interpret. I also learned to distinguish what a demo verifies from what still requires acceptance and integration in the final environment.",
        },
        features: [
            {
                title: {
                    es: "Estudios, territorios y cuotas",
                    en: "Studies, territories and quotas",
                },
                description: {
                    es: "Configuración y consulta de estudios, zonas operativas y cuotas territoriales, con metas asociadas al alcance del estudio.",
                    en: "Study, operational zone and territorial quota configuration and lookup, with targets linked to the study's scope.",
                },
            },
            {
                title: { es: "Instrumentos versionados", en: "Versioned instruments" },
                description: {
                    es: "Versiones publicadas y vista previa de solo lectura con nueve tipos de pregunta: texto corto y largo, número, booleano, fecha, fecha/hora, selección simple y múltiple, y escala.",
                    en: "Published versions and a read-only preview with nine question types: short and long text, number, boolean, date, date/time, single and multiple choice, and scale.",
                },
            },
            {
                title: { es: "Asignaciones de campo", en: "Fieldwork assignments" },
                description: {
                    es: "Responsables y supervisores vinculados a una versión publicada del instrumento, un periodo y metas individuales y territoriales.",
                    en: "Surveyors and supervisors linked to a published instrument version, a period, and individual and territorial targets.",
                },
            },
            {
                title: { es: "Actividades y trazabilidad", en: "Activities and traceability" },
                description: {
                    es: "Bandeja y detalle de actividades recibidas con respuestas tipadas, versión de origen y tiempos diferenciados de captura en dispositivo y recepción en servidor.",
                    en: "Incoming activity inbox and details with typed responses, originating version, and distinct device capture and server receipt timestamps.",
                },
            },
            {
                title: { es: "Supervisión y calidad", en: "Supervision and quality" },
                description: {
                    es: "Revisión de actividades y consulta de hallazgos con evidencia y notas. El estado de revisión se mantiene separado del resultado obtenido en campo.",
                    en: "Activity review and quality finding lookup with evidence and notes. Review status remains separate from the outcome recorded in the field.",
                },
            },
            {
                title: { es: "Seguimiento y exportaciones", en: "Monitoring and exports" },
                description: {
                    es: "Dashboard y gráficos diarios y horarios con filtro territorial que actualiza las métricas. Exportaciones CSV y XLSX verificadas con solicitudes reales en la demo.",
                    en: "Dashboard and daily and hourly charts with a territorial filter that updates the metrics. CSV and XLSX exports verified through real requests in the demo.",
                },
            },
            {
                title: {
                    es: "Autorización por rol y alcance",
                    en: "Authorization by role and scope",
                },
                description: {
                    es: "Permisos aplicados en backend para operaciones, detalle sensible y exportaciones. Los perfiles de consulta acceden a reportes agregados según su autorización.",
                    en: "Backend-enforced permissions for operations, sensitive details and exports. Read-only roles access aggregated reports according to their authorization.",
                },
            },
            {
                title: { es: "Contrato de integración móvil", en: "Mobile integration contract" },
                description: {
                    es: "API de preparación y sincronización idempotente inspeccionada en código y documentación. La aplicación Flutter a cargo de otros compañeros no se ejecutó durante la revisión local.",
                    en: "Preparation and idempotent synchronization API inspected in code and documentation. The Flutter application handled by other team members was not run during the local review.",
                },
            },
        ],
        galleryNotice: {
            es: "Capturas de un entorno local con datos de demostración. Las cifras, personas, respuestas y ubicaciones no representan resultados reales.",
            en: "Screenshots from a local environment with demonstration data. Figures, people, responses and locations do not represent real study results.",
        },
        gallery: gmSocialGallery,
    },
];

export const education: EducationEntry[] = [
    {
        id: "utp",
        institution: "Universidad Tecnológica del Perú (UTP)",
        program: { es: "Ingeniería de Software", en: "Software Engineering" },
        location: { es: "Lima, Perú", en: "Lima, Peru" },
        period: { es: "2026 – Actualidad", en: "2026 – Present" },
        status: "in-progress",
    },
    {
        id: "idat",
        institution: "IDAT – Instituto de Educación Superior",
        program: {
            es: "Desarrollo de Sistemas de Información",
            en: "Information Systems Development",
        },
        location: { es: "Lima, Perú", en: "Lima, Peru" },
        period: { es: "2023", en: "2023" },
        status: "graduate",
    },
];

export const languages: LanguageSkill[] = [
    {
        id: "spanish",
        name: { es: "Español", en: "Spanish" },
        level: { es: "Nativo", en: "Native" },
    },
    {
        id: "english",
        name: { es: "Inglés", en: "English" },
        level: { es: "Intermedio", en: "Intermediate" },
        description: {
            es: "Lectura técnica y comunicación oral/escrita",
            en: "Technical reading and spoken/written communication",
        },
    },
    {
        id: "italian",
        name: { es: "Italiano", en: "Italian" },
        level: { es: "Básico", en: "Basic" },
    },
];

// Profile technologies confirmed by the owner; project tags describe each project's own stack.
export const skillGroups: SkillGroup[] = [
    {
        id: "frontend",
        label: { es: "Frontend", en: "Frontend" },
        items: ["React", "JavaScript", "TypeScript", "Next.js"],
    },
    {
        id: "backend",
        label: { es: "Backend", en: "Backend" },
        items: ["Python", "Django REST Framework", "Node.js"],
    },
    {
        id: "database",
        label: { es: "Base de datos", en: "Database" },
        items: ["PostgreSQL", "SQL Server", "MySQL"],
    },
    {
        id: "cloud",
        label: { es: "Despliegue · AWS básico", en: "Deployment · AWS basics" },
        items: ["EC2", "S3", "IAM", "Route 53", "VPC"],
    },
    {
        id: "ai",
        label: { es: "Inteligencia artificial", en: "Artificial intelligence" },
        items: [],
    },
    {
        id: "tools",
        label: { es: "Herramientas y prácticas", en: "Tools & practices" },
        items: ["Git", "Docker", "Testing"],
    },
];
