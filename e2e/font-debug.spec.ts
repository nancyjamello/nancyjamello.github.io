import { test, expect } from "@playwright/test";

test.describe("Font rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Livory font loads", async ({ page }) => {
    const result = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        regular: document.fonts.check("400 16px Livory"),
        bold: document.fonts.check("700 16px Livory"),
      };
    });
    expect(result.regular).toBe(true);
    expect(result.bold).toBe(true);
  });

  test("body and headings use Livory font-family", async ({ page }) => {
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      const body = window.getComputedStyle(document.body).fontFamily;
      const h1 = window.getComputedStyle(document.querySelector("h1")!).fontFamily;
      return { body, h1 };
    });
    expect(fonts.body).toContain("Livory");
    expect(fonts.h1).toContain("Livory");
  });
});
