import { expect, test } from "@playwright/test";

test("carousel controls preserve focus, boundaries and direct project navigation", async ({
    page,
}) => {
    await page.goto("/es#projects");
    const carousel = page.locator(".project-carousel");
    const previous = carousel.getByRole("button", { name: "Proyecto anterior", exact: true });
    const next = carousel.getByRole("button", { name: "Proyecto siguiente", exact: true });
    const count = carousel.locator(".project-carousel-count");
    await expect(previous).toHaveAttribute("aria-disabled", "true");
    await expect(count).toHaveText("01/ 03");
    await next.focus();
    await page.keyboard.press("Enter");
    await expect(count).toHaveText("02/ 03");
    await expect(next).toBeFocused();
    await next.click();
    await expect(next).toHaveAttribute("aria-disabled", "true");
    await expect(next).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(count).toHaveText("03/ 03");
    await expect
        .poll(() =>
            carousel.locator(".project-list").evaluate((track) => {
                const slides = track.children as HTMLCollectionOf<HTMLElement>;
                return Math.abs(track.scrollLeft - (slides[2].offsetLeft - slides[0].offsetLeft));
            })
        )
        .toBeLessThan(2);
    await expect(carousel.getByRole("status")).toContainText("Proyecto 3 de 3: Servicio MFA");
    const iperc = carousel.getByRole("button", { name: /^Mostrar proyecto: IPERC Antapaccay/ });
    await iperc.click();
    await expect(iperc).toHaveAttribute("aria-disabled", "true");
    const card = carousel.locator("article").filter({
        has: page.getByRole("heading", { name: /^IPERC Antapaccay/ }),
    });
    await card.getByRole("link", { name: "Explorar proyecto", exact: true }).click();
    await expect(page).toHaveURL(/\/es\/projects\/iperc-antapaccay$/);
});

test("carousel keyboard navigation and focus reveal offscreen project links", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en#projects");
    const track = page.locator(".project-list");
    const count = page.locator(".project-carousel-count");
    await track.focus();
    await page.keyboard.press("Alt+ArrowRight");
    await expect(count).toHaveText("01/ 03");
    await page.keyboard.press("ArrowRight");
    await expect(count).toHaveText("02/ 03");
    await expect(track).toBeFocused();
    await page.keyboard.press("End");
    await expect(count).toHaveText("03/ 03");
    await page.keyboard.press("Home");
    await expect(count).toHaveText("01/ 03");
    await page.keyboard.press("Tab");
    await expect(track.locator("article").nth(0).getByRole("link")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(track.locator("article").nth(1).getByRole("link")).toBeFocused();
    await expect(count).toHaveText("02/ 03");
    const bounds = await track.locator("article").nth(1).boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(1440);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/projects\/iperc-antapaccay$/);
});

test("native touch swipe updates the active project and survives resizing", async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
        reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/en#projects");
    const track = page.locator(".project-list");
    await track.scrollIntoViewIfNeeded();
    const box = await track.boundingBox();
    const y = Math.max(130, box!.y + 90);
    const cdp = await context.newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: 340, y }],
    });
    for (const x of [290, 240, 190, 140, 90, 40]) {
        await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x, y }],
        });
        await page.waitForTimeout(35);
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(page.locator(".project-carousel-count")).toHaveText("02/ 03");
    await page.setViewportSize({ width: 1024, height: 900 });
    await expect(page.locator(".project-carousel-count")).toHaveText("02/ 03");
    await expect
        .poll(async () => {
            const card = await track.locator("article").nth(1).boundingBox();
            const viewport = await track.boundingBox();
            return Math.abs(card!.x - viewport!.x - 4);
        })
        .toBeLessThan(2);
    await context.close();
});

test("carousel remains readable and keyboard navigable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/es#projects");
    const track = page.locator(".project-list");
    await expect(track.locator("article")).toHaveCount(3);
    await expect(page.locator(".project-carousel-controls")).toBeHidden();
    await expect(page.locator(".project-carousel-pagination")).toBeHidden();
    await track.focus();
    await page.keyboard.press("Tab");
    await expect(track.locator("article").nth(0).getByRole("link")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(track.locator("article").nth(1).getByRole("link")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/es\/projects\/iperc-antapaccay$/);
    await context.close();
});

test("reduced motion switches projects immediately and keeps page scrolling stable", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/es#projects");
    const before = await page.evaluate(() => window.scrollY);
    await page.getByRole("button", { name: "Proyecto siguiente", exact: true }).click();
    const result = await page.locator(".project-list").evaluate(async (track) => {
        await new Promise(requestAnimationFrame);
        const slides = track.children as HTMLCollectionOf<HTMLElement>;
        return {
            actual: track.scrollLeft,
            expected: slides[1].offsetLeft - slides[0].offsetLeft,
            scrollY: window.scrollY,
        };
    });
    expect(Math.abs(result.actual - result.expected)).toBeLessThan(2);
    expect(result.scrollY).toBe(before);
});
