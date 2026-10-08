import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("redirects to Spanish, renders the eight sections and has no runtime errors", async ({
    page,
}, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Ideas que tomanforma en código."
    );
    await expect(page.locator("main > section")).toHaveCount(8);
    const experiences = page.locator("#experiences");
    await expect(experiences.locator("article")).toHaveCount(2);
    await expect(experiences).toContainText("Egresados UTP");
    await expect(experiences).toContainText("IGH · Inveritas Global Holdings");
    await expect(experiences.getByRole("heading", { level: 2 })).toHaveText(
        "Experiencias que suman."
    );
    // An empty images directory must render useful content without broken image requests.
    for (const card of await experiences.locator("article").all()) {
        const image = card.locator("img");
        if ((await image.count()) === 0) {
            await expect(card.getByText("Captura pendiente", { exact: true })).toBeAttached();
            await expect(card.locator("a")).toHaveCount(0);
        } else {
            await image.scrollIntoViewIfNeeded();
            await expect(image).toHaveJSProperty("complete", true);
            expect(
                await image.evaluate((element: HTMLImageElement) => element.naturalWidth)
            ).toBeGreaterThan(0);
            await expect(image).toHaveCSS("object-fit", "contain");
            await expect(card.locator("figcaption a")).toHaveAttribute(
                "href",
                /^\/images\/experiences\//
            );
        }
    }
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: testInfo.outputPath("desktop.png"), animations: "disabled" });
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(experiences.getByRole("heading", { level: 2 })).toHaveText(
        "Experiences that shape my journey."
    );
    await expect(experiences).toContainText("Published on LinkedIn by");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("to life in code.");
    expect(errors).toEqual([]);
});

test("education and languages preserve confirmed dates and academic status in both locales", async ({
    page,
}) => {
    await page.goto("/es#education");
    const section = page.locator("#education");
    const cards = section.locator("article");
    await expect(cards).toHaveCount(2);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Mi educación");
    await expect(cards.nth(0)).toContainText("Universidad Tecnológica del Perú (UTP)");
    await expect(cards.nth(0).getByRole("heading")).toHaveText("Ingeniería de Software");
    await expect(cards.nth(0)).toContainText("2026 – Actualidad");
    await expect(cards.nth(0).locator(".education-status")).toHaveText("En curso");
    await expect(cards.nth(1)).toContainText("IDAT – Instituto de Educación Superior");
    await expect(cards.nth(1).getByRole("heading")).toHaveText(
        "Desarrollo de Sistemas de Información"
    );
    await expect(cards.nth(1).locator(".education-period")).toHaveText("2023");
    await expect(cards.nth(1).locator(".education-status")).toHaveText("Egresado");
    await expect(section.locator(".education-location")).toHaveText(["Lima, Perú", "Lima, Perú"]);
    await expect(section.locator("dt")).toHaveText(["Español", "Inglés", "Italiano"]);
    await expect(section.locator(".language-level")).toHaveText(["Nativo", "Intermedio", "Básico"]);
    await expect(section.locator(".language-description")).toHaveText(
        "Lectura técnica y comunicación oral/escrita"
    );
    expect(
        await page.locator("main > section").evaluateAll((elements) => elements.map((el) => el.id))
    ).toEqual([
        "hero",
        "projects",
        "about",
        "education",
        "stack",
        "experiences",
        "labs",
        "contact",
    ]);
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("My education");
    await expect(cards.nth(0).getByRole("heading")).toHaveText("Software Engineering");
    await expect(cards.nth(0)).toContainText("2026 – Present");
    await expect(cards.nth(0).locator(".education-status")).toHaveText("In progress");
    await expect(cards.nth(1).getByRole("heading")).toHaveText("Information Systems Development");
    await expect(cards.nth(1).locator(".education-status")).toHaveText("Graduate");
    await expect(section.locator("dt")).toHaveText(["Spanish", "English", "Italian"]);
    await expect(section.locator(".language-level")).toHaveText([
        "Native",
        "Intermediate",
        "Basic",
    ]);
    await expect(section.locator(".language-description")).toHaveText(
        "Technical reading and spoken/written communication"
    );
});

test("theme switches and persists on reload and locale navigation", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Activar tema claro" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("archive order, direct detail and language switch preserve the project", async ({ page }) => {
    await page.goto("/es");
    const archive = page.locator("#projects");
    await expect(archive.locator("article")).toHaveCount(2);
    await expect(archive.locator("article h3")).toHaveText([
        "GM Social — Gestión de estudios y trabajo de campo",
        "Servicio MFA para plataformas empresariales",
    ]);
    await expect(archive.getByRole("button")).toHaveCount(0);
    await expect(archive.getByRole("heading", { name: "Orbital Signal" })).toHaveCount(0);
    await expect(archive.locator(".contribution-summary")).toHaveCount(2);
    const response = await page.goto("/es/projects/orbital-signal");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "La arquitectura" })).toBeVisible();
    await expect(page.locator("header .desktop-navigation a[aria-current]")).toHaveText(
        "Proyectos"
    );
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en\/projects\/orbital-signal$/);
    await expect(page.getByRole("heading", { name: "The architecture" })).toBeVisible();
    await page.getByRole("link", { name: "Back to projects" }).first().click();
    await expect(page).toHaveURL(/\/en#projects$/);
    await expect(archive.locator("article")).toHaveCount(2);
});

test("full stack case has a working demo gallery, original images and bilingual navigation", async ({
    page,
    request,
}) => {
    await page.goto("/es");
    const archive = page.locator("#projects");
    await archive
        .locator("article")
        .filter({ has: page.getByRole("heading", { name: /^GM Social/ }) })
        .getByRole("link", { name: "Explorar proyecto", exact: true })
        .click();
    await expect(page).toHaveURL(/\/es\/projects\/plataforma-encuestas-gm$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "GM Social — Gestión de estudios y trabajo de campo"
    );
    await expect(page.locator(".project-detail-header .eyebrow")).toHaveText(
        "03 / FULL STACK EMPRESARIAL · PROYECTO PRIVADO"
    );
    await expect(page.locator(".project-external-links a")).toHaveCount(0);
    await expect(page.locator(".project-features h3")).toHaveCount(8);
    await expect(page.locator(".project-gallery-notice")).toContainText(
        "no representan resultados reales"
    );
    const images = page.locator(".project-gallery img");
    await expect(images).toHaveCount(8);
    for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
        await expect(image).toHaveJSProperty("naturalWidth", 1920);
        await expect(image).toHaveJSProperty("naturalHeight", 1080);
        const ratio = await image.evaluate((element) => {
            const { width, height } = element.getBoundingClientRect();
            return width / height;
        });
        expect(ratio).toBeCloseTo(16 / 9, 2);
    }
    const originals = page.locator(".project-gallery figcaption a");
    await expect(originals).toHaveCount(8);
    for (const link of await originals.all()) {
        const href = await link.getAttribute("href");
        expect(href).toMatch(/^\/images\/projects\/plataforma-encuestas-gm\//);
        const response = await request.get(href!);
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toContain("image/png");
    }
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en\/projects\/plataforma-encuestas-gm$/);
    await expect(page).toHaveTitle(/GM Social — Social study and fieldwork management/);
    await expect(page.locator(".project-gallery-notice")).toContainText(
        "do not represent real study results"
    );
    await expect(page.getByRole("heading", { name: "Mobile integration contract" })).toBeVisible();
    await expect(
        page.getByRole("link", {
            name: "Open original screenshot: Fieldwork dashboard",
            exact: true,
        })
    ).toHaveAttribute("href", "/images/projects/plataforma-encuestas-gm/01-dashboard.png");
    await page.getByRole("link", { name: "Back to projects" }).first().click();
    await expect(page).toHaveURL(/\/en#projects$/);
});

test("orbital lab responds to keyboard, trajectory, pause and reset", async ({ page }) => {
    await page.goto("/es#labs");
    const speed = page.getByRole("slider", { name: "Velocidad orbital" });
    await speed.focus();
    await page.keyboard.press("ArrowRight");
    await expect(speed).toHaveValue("1.25");
    await expect(page.locator("output")).toHaveText("1.25×");
    await page.getByRole("button", { name: "Elíptica", exact: true }).click();
    await expect(page.getByRole("button", { name: "Elíptica", exact: true })).toHaveAttribute(
        "aria-pressed",
        "true"
    );
    await page.getByRole("button", { name: "Pausar animación" }).click();
    await expect(page.locator(".lab-orbiter")).toHaveCSS("animation-play-state", "paused");
    await page.getByRole("button", { name: "Restablecer" }).click();
    await expect(speed).toHaveValue("1");
    await expect(page.getByRole("button", { name: "Circular", exact: true })).toHaveAttribute(
        "aria-pressed",
        "true"
    );
    await expect(page.locator(".lab-orbiter")).toHaveCSS("animation-play-state", "running");
});

test("backend case has verified screenshots, locale navigation and deployment attribution", async ({
    page,
    request,
}) => {
    await page.goto("/es");
    const archive = page.locator("#projects article").filter({
        has: page.getByRole("heading", {
            name: "Servicio MFA para plataformas empresariales",
            exact: true,
        }),
    });
    await expect(archive).toHaveCount(1);
    await expect(archive.getByRole("heading", { name: "Orbital Signal" })).toHaveCount(0);
    await expect(archive.locator(".project-cover-link img")).toHaveAttribute(
        "src",
        "/images/projects/servicio-mfa/01-api-codigo-valido.png"
    );
    await archive.getByRole("link", { name: "Explorar proyecto", exact: true }).click();
    await expect(page).toHaveURL(/\/es\/projects\/servicio-mfa$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Servicio MFA para plataformas empresariales"
    );
    await expect(
        page.getByText(/Despliegue inicial realizado por otro integrante del equipo/)
    ).toBeVisible();
    await expect(page.locator(".project-detail-header .eyebrow")).toHaveText(
        "02 / BACKEND EMPRESARIAL · PROYECTO PRIVADO"
    );
    await expect(page.locator(".project-detail .project-artwork")).toHaveCount(0);
    await expect(page.locator(".project-cover figcaption")).toContainText("cliente de prueba");
    await expect(page.locator(".project-gallery-notice")).toContainText("datos sintéticos");
    const images = page.locator(".project-cover img, .project-gallery img");
    await expect(images).toHaveCount(5);
    for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
        await expect(image).toHaveJSProperty("naturalWidth", 1920);
        await expect(image).toHaveJSProperty("naturalHeight", 1080);
        const ratio = await image.evaluate((element) => {
            const { width, height } = element.getBoundingClientRect();
            return width / height;
        });
        expect(ratio).toBeCloseTo(16 / 9, 2);
    }
    const originals = page.locator(".project-gallery figcaption a");
    await expect(originals).toHaveCount(4);
    for (const link of await originals.all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        const href = await link.getAttribute("href");
        expect(href).toMatch(/^\/images\/projects\/servicio-mfa\//);
        const response = await request.get(href!);
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toContain("image/png");
    }
    await expect(page.locator(".project-external-links a")).toHaveCount(0);
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en\/projects\/servicio-mfa$/);
    await expect(page).toHaveTitle(/MFA service for enterprise platforms/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "MFA service for enterprise platforms"
    );
    await expect(
        page.getByText(/Initial deployment performed by another team member/)
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Engineering decisions" })).toBeVisible();
    await expect(page.locator(".project-gallery-notice")).toContainText("not a product interface");
    await expect(
        page.getByRole("link", {
            name: "Open original screenshot: Valid verification code",
            exact: true,
        })
    ).toHaveAttribute("href", "/images/projects/servicio-mfa/01-api-codigo-valido.png");
    await page.getByRole("link", { name: "Back to projects" }).first().click();
    await expect(page).toHaveURL(/\/en#projects$/);
});

test("reduced motion disables orbit animation and keeps content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/es#labs");
    await expect(
        page.getByText("Movimiento reducido activo: la señal permanece estática.")
    ).toBeVisible();
    await expect(page.locator(".lab-orbiter")).toHaveCSS("animation-name", "none");
    await expect(page.getByRole("button", { name: "Reanudar animación" })).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Orbital playground" })).toBeVisible();
});

test("mobile navigation closes on Escape and section selection", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/es");
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: testInfo.outputPath("mobile.png"), animations: "disabled" });
    const menu = page.locator(".compact-menu > summary");
    await menu.click();
    await expect(page.locator("#compact-navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(page.locator("#compact-navigation")).toBeHidden();
    await menu.click();
    await page.locator("#compact-navigation").getByRole("link", { name: "Proyectos" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#compact-navigation")).toBeHidden();
});

for (const width of [360, 390, 768, 1280, 1920]) {
    test(`no horizontal overflow at ${width}px in either language`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        for (const locale of ["es", "en"]) {
            await page.goto(`/${locale}`);
            await page.evaluate(() => document.fonts.ready);
            const dimensions = await page.evaluate(() => ({
                scroll: document.documentElement.scrollWidth,
                viewport: document.documentElement.clientWidth,
            }));
            expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport);
        }
    });
}

for (const locale of ["es", "en"]) {
    for (const theme of ["dark", "light"]) {
        test(`WCAG A/AA automated checks: ${locale}, ${theme}`, async ({ page }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.goto(`/${locale}`);
            if (theme === "light")
                await page
                    .getByRole("button", {
                        name: locale === "es" ? "Activar tema claro" : "Switch to light theme",
                    })
                    .click();
            const result = await new AxeBuilder({ page })
                .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
                .analyze();
            expect(result.violations).toEqual([]);
        });
    }
}

test("project detail passes automated accessibility checks", async ({ page }) => {
    for (const slug of ["orbital-signal", "servicio-mfa", "plataforma-encuestas-gm"]) {
        await page.goto(`/en/projects/${slug}`);
        const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
        expect(result.violations).toEqual([]);
    }
});

test("missing pages return 404 and local preview stays unindexed", async ({ request, page }) => {
    for (const path of [
        "/fr",
        "/es/projects/missing",
        "/en/projects/missing",
        "/es/missing/path",
    ]) {
        const response = await request.get(path);
        expect(response.status()).toBe(404);
    }
    await page.goto("/fr");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta señal no llegó.");
    await page.goto("/en/projects/missing");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This signal didn't arrive.");
    await page.goto("/es");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow"
    );
    expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
    await expect(page.locator('a[href=""], a[href="#"], a[href="mailto:"]')).toHaveCount(0);
});

test("content and project routes remain readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/es");
    await expect(page.getByRole("heading", { name: "Más allá del código." })).toBeVisible();
    await expect(page.locator("#experiences article")).toHaveCount(2);
    await expect(page.locator("#experiences")).toContainText("Egresados UTP");
    await expect(page.locator("#experiences")).toContainText("IGH · Inveritas Global Holdings");
    await expect(page.locator("#education article")).toHaveCount(2);
    await expect(page.locator("#education")).toContainText("Ingeniería de Software");
    await expect(page.locator("#education .education-status")).toHaveText(["En curso", "Egresado"]);
    await expect(page.locator("#education dt")).toHaveText(["Español", "Inglés", "Italiano"]);
    await expect(page.locator("#projects article")).toHaveCount(2);
    await expect(page.getByRole("heading", { name: "Orbital Signal", exact: true })).toHaveCount(0);
    await page.goto("http://127.0.0.1:3100/es/projects/orbital-signal");
    await expect(page.getByRole("heading", { name: "Orbital Signal", exact: true })).toBeVisible();
    await page.goto("http://127.0.0.1:3100/es");
    await page
        .locator("article")
        .filter({
            has: page.getByRole("heading", {
                name: "Servicio MFA para plataformas empresariales",
                exact: true,
            }),
        })
        .getByRole("link", { name: "Explorar proyecto", exact: true })
        .click();
    await expect(page).toHaveURL(/\/es\/projects\/servicio-mfa$/);
    await expect(page.getByRole("heading", { name: "Mi participación" })).toBeVisible();
    await expect(page.locator(".project-gallery figcaption a")).toHaveCount(4);
    await expect(page.locator(".project-gallery-notice")).toContainText("datos sintéticos");
    await page.goto("http://127.0.0.1:3100/es");
    await page
        .locator("article")
        .filter({ has: page.getByRole("heading", { name: /^GM Social/ }) })
        .getByRole("link", { name: "Explorar proyecto", exact: true })
        .click();
    await expect(page).toHaveURL(/\/es\/projects\/plataforma-encuestas-gm$/);
    await expect(page.getByRole("heading", { name: "Funcionalidades principales" })).toBeVisible();
    await expect(page.locator(".project-gallery figcaption a")).toHaveCount(8);
    await context.close();
});

test("skip link is the first keyboard destination", async ({ page }) => {
    await page.goto("/es");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
});

test("header exposes education, secondary sections and mobile CV while preserving locale anchors", async ({
    page,
}) => {
    await page.goto("/es#education");
    const header = page.locator(".site-header");
    await expect(header.locator('.desktop-navigation a[aria-current="location"]')).toHaveText(
        "Educación"
    );
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en#education$/);
    await expect(header.locator('.desktop-navigation a[aria-current="location"]')).toHaveText(
        "Education"
    );
    await header.locator(".more-menu summary").click();
    await header.getByRole("link", { name: "Experiences & community", exact: true }).click();
    await expect(header.locator(".more-menu summary")).toHaveClass(/active/);
    await expect(header.locator(".more-menu")).not.toHaveAttribute("open");
    await page.setViewportSize({ width: 1024, height: 800 });
    await header.locator(".compact-menu summary").click();
    await expect(header.getByRole("link", { name: "Download CV" })).toBeVisible();
    await header.getByRole("link", { name: "Education", exact: true }).click();
    await expect(page).toHaveURL(/#education$/);
    await expect(header.locator(".compact-menu")).not.toHaveAttribute("open");
    await header.locator(".compact-menu summary").click();
    await page.locator(".education-card").first().click();
    await expect(header.locator(".compact-menu")).not.toHaveAttribute("open");
});

test("native disclosures and archive navigation work without JavaScript on mobile", async ({
    browser,
}) => {
    const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 360, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/es");
    await page.locator(".compact-menu summary").click();
    await expect(
        page.locator("#compact-navigation").getByRole("link", { name: "Descargar CV" })
    ).toBeVisible();
    await page
        .locator("#compact-navigation")
        .getByRole("link", { name: "Educación", exact: true })
        .click();
    await expect(page).toHaveURL(/#education$/);
    await expect(page.locator("#education")).toContainText("Ingeniería de Software");
    await context.close();
});
