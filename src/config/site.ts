const configuredUrl = process.env.SITE_URL;

function getSiteUrl(value: string | undefined) {
    if (!value) return null;
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error("SITE_URL must use http or https.");
    }
    return url.origin;
}

export const siteConfig = {
    brand: "JEAMPIEER.TECH",
    name: "Jeampieer",
    url: getSiteUrl(configuredUrl),
    // Fill only with verified, public information. Empty values are not rendered.
    email: "jeampieerlimahuaya@gmail.com",
    github: "https://github.com/jeampieer",
    linkedin: "https://www.linkedin.com/in/jeampieerlimahuaya/",
    cv: "/documents/Jeampieer-Limahuaya-CV.pdf",
    portrait: "/images/profile.png",
};
