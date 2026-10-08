import { expect, test } from "@playwright/test";

// Exercise all public compositions at the navigation breakpoints in both locales/themes.
for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    test(`responsive views, theme and recovery matrix at ${width}px`, async ({
        browser,
    }, testInfo) => {
        test.setTimeout(120_000);
        for (const theme of ["dark", "light"]) {
            const context = await browser.newContext({
                viewport: { width, height: 900 },
                reducedMotion: "reduce",
            });
            await context.addInitScript((value) => localStorage.setItem("theme", value), theme);
            const page = await context.newPage();
            const errors: string[] = [];
            page.on("pageerror", (error) => errors.push(error.message));
            page.on("console", (message) => {
                if (
                    message.type() === "error" &&
                    /hydration|hydrated|script tag|data-scroll-behavior/i.test(message.text())
                )
                    errors.push(message.text());
            });
            for (const locale of ["es", "en"]) {
                for (const view of [
                    "",
                    "/projects/orbital-signal",
                    "/projects/servicio-mfa",
                    "/projects/plataforma-encuestas-gm",
                    "/projects/missing",
                    "/missing/path",
                ]) {
                    const response = await page.goto(`/${locale}${view}`);
                    expect(response?.status()).toBe(view.includes("missing") ? 404 : 200);
                    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
                    await page.evaluate(() => document.fonts.ready);
                    const dimensions = await page.evaluate(() => ({
                        scroll: document.documentElement.scrollWidth,
                        viewport: document.documentElement.clientWidth,
                    }));
                    expect(dimensions.scroll, `${locale}${view}, ${theme}`).toBeLessThanOrEqual(
                        dimensions.viewport
                    );
                    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
                    if (view === "") {
                        const compact = page.locator(".compact-menu summary");
                        if (width < 1280) {
                            await expect(compact).toBeVisible();
                            await compact.click();
                            const menu = page.locator("#compact-navigation");
                            await expect(
                                menu.getByRole("link", {
                                    name: locale === "es" ? "Descargar CV" : "Download CV",
                                })
                            ).toBeVisible();
                            const bounds = await menu.boundingBox();
                            expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(900);
                            await page.keyboard.press("Escape");
                        } else {
                            await expect(compact).toBeHidden();
                            await expect(page.locator(".desktop-navigation")).toBeVisible();
                        }
                    } else if (view.includes("/projects/") && !view.includes("missing")) {
                        const fontSize = await page
                            .locator(".project-detail h1")
                            .evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));
                        expect(fontSize).toBeLessThanOrEqual(width < 768 ? 40 : 56);
                        await expect(page.locator(".case-index")).toBeVisible();
                    }
                    const name = `${locale}-${theme}-${width}-${view.split("/").filter(Boolean).join("-") || "home"}`;
                    if (width === 390 || width === 1440) {
                        for (const image of await page.locator("main img").all()) {
                            await image.scrollIntoViewIfNeeded();
                            await expect(image).toHaveJSProperty("complete", true);
                        }
                        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
                        await page.screenshot({
                            path: testInfo.outputPath(`${name}.png`),
                            fullPage: true,
                            animations: "disabled",
                        });
                    }
                }
            }
            expect(errors).toEqual([]);
            await context.close();
        }
    });
}
