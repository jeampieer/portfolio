import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("redirects to Spanish, renders the seven sections and has no runtime errors", async ({
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
    await expect(page.locator("main > section")).toHaveCount(7);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: testInfo.outputPath("desktop.png"), animations: "disabled" });
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("to life in code.");
    expect(errors).toEqual([]);
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

test("project filters, detail and language switch preserve the project", async ({ page }) => {
    await page.goto("/es");
    const archive = page.locator("#projects");
    await expect(archive.locator("article")).toHaveCount(2);
    await expect(
        archive.getByRole("heading", { name: "Servicio MFA para plataformas empresariales" })
    ).toBeVisible();
    await expect(archive.getByRole("heading", { name: /^GM Social/ })).toBeVisible();
    await expect(archive.getByRole("heading", { name: "Orbital Signal" })).toHaveCount(0);
    await archive.getByRole("button", { name: "Full stack", exact: true }).click();
    await expect(archive.getByRole("heading", { name: /^GM Social/ })).toBeVisible();
    await expect(archive.locator("article")).toHaveCount(1);
    await expect(archive.getByRole("heading", { name: "Orbital Signal" })).toHaveCount(0);
    await archive.getByRole("button", { name: "Frontend", exact: true }).click();
    await expect(
        archive.getByText("Aún no hay proyectos publicados en esta categoría.")
    ).toBeVisible();
    await expect(archive.locator("article")).toHaveCount(0);
    const response = await page.goto("/es/projects/orbital-signal");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/es\/projects\/orbital-signal$/);
    await expect(page.getByRole("heading", { name: "La arquitectura" })).toBeVisible();
    await page.getByRole("link", { name: "Read in English" }).click();
    await expect(page).toHaveURL(/\/en\/projects\/orbital-signal$/);
    await expect(page.getByRole("heading", { name: "The architecture" })).toBeVisible();
    await page.getByRole("link", { name: "Back to projects" }).first().click();
    await expect(page).toHaveURL(/\/en#projects$/);
    await expect(archive.locator("article")).toHaveCount(2);
    await expect(archive.getByRole("heading", { name: "Orbital Signal" })).toHaveCount(0);
});

test("full stack case has a working demo gallery, original images and bilingual navigation", async ({
    page,
    request,
}) => {
    await page.goto("/es");
    const archive = page.locator("#projects");
    await archive.getByRole("button", { name: "Full stack", exact: true }).click();
    await archive.getByRole("link", { name: "Explorar proyecto", exact: true }).click();
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
    const archive = page.locator("#projects");
    await archive.getByRole("button", { name: "Backend", exact: true }).click();
    await expect(archive.locator("article")).toHaveCount(1);
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
    const menu = page.getByRole("button", { name: "Abrir menú" });
    await menu.click();
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(page.getByRole("navigation")).toBeHidden();
    await menu.click();
    await page.getByRole("navigation").getByRole("link", { name: "Proyectos" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.getByRole("navigation")).toBeHidden();
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
