import type { ProjectImage } from "@/features/portfolio/types/portfolio.types";

export const mfaGallery: ProjectImage[] = [
    {
        src: "/images/projects/servicio-mfa/03-admin-plataformas.png",
        width: 1920,
        height: 1080,
        title: {
            es: "Plataformas sintéticas en Django Admin",
            en: "Synthetic platforms in Django Admin",
        },
        alt: {
            es: "Django Admin original mostrando las configuraciones ATLAS-DEMO y NOVA-DEMO.",
            en: "Original Django Admin showing ATLAS-DEMO and NOVA-DEMO configurations.",
        },
        caption: {
            es: "Administración real del backend con dos configuraciones de plataforma sintéticas. Las claves y sus hashes quedan fuera de la captura.",
            en: "Actual backend administration with two synthetic platform configurations. Keys and their hashes are not shown.",
        },
    },
    {
        src: "/images/projects/servicio-mfa/04-admin-registro-solicitud.png",
        width: 1920,
        height: 1080,
        title: {
            es: "Registro de solicitud validada",
            en: "Validated request record",
        },
        alt: {
            es: "Django Admin original mostrando un contador de registro validado para demo-001 y ATLAS-DEMO.",
            en: "Original Django Admin showing a validated registration counter for demo-001 and ATLAS-DEMO.",
        },
        caption: {
            es: "Registro creado por la prueba HTTP de alta: usuario sintético, plataforma, fecha, cantidad y clasificación REGISTER / VALIDATE.",
            en: "Record created by the HTTP registration test: synthetic user, platform, date, count and REGISTER / VALIDATE classification.",
        },
    },
    {
        src: "/images/projects/servicio-mfa/01-api-codigo-valido.png",
        width: 1920,
        height: 1080,
        title: {
            es: "Verificación de código vigente",
            en: "Valid verification code",
        },
        alt: {
            es: "Herramienta de prueba local con respuesta HTTP 202, auth verdadero y código oculto.",
            en: "Local testing tool showing HTTP 202, auth true, and a hidden verification code.",
        },
        caption: {
            es: "El backend acepta un código vigente con HTTP 202 e invalida el código tras su uso. Resultado mostrado en el cliente local de prueba.",
            en: "The backend accepts a valid code with HTTP 202 and invalidates it after use. Result shown in the local test client.",
        },
    },
    {
        src: "/images/projects/servicio-mfa/02-api-destinatario-rechazado.png",
        width: 1920,
        height: 1080,
        title: {
            es: "Validación del destinatario antes del correo",
            en: "Recipient validation before email",
        },
        alt: {
            es: "Herramienta de prueba local con registro rechazado HTTP 400 por correo no coincidente.",
            en: "Local testing tool showing HTTP 400 for a registration email that does not match.",
        },
        caption: {
            es: "El backend contrasta identificador y correo con la plataforma de origen de prueba. Un destinatario no coincidente recibe HTTP 400 sin generar otro correo.",
            en: "The backend checks the identifier and email with the test origin platform. A mismatched recipient receives HTTP 400 without another email being generated.",
        },
    },
];
