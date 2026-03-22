import { test, expect } from "@playwright/test";

const MOCK_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"
      xmlns:media="http://search.yahoo.com/mrss/"
      xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <yt:videoId>test123</yt:videoId>
    <title>Test Yoga Video</title>
    <published>2024-01-15T00:00:00+00:00</published>
    <media:group>
      <media:thumbnail url="https://img.youtube.com/vi/test123/mqdefault.jpg"/>
    </media:group>
  </entry>
  <entry>
    <yt:videoId>test456</yt:videoId>
    <title>Another Yoga Video</title>
    <published>2024-02-20T00:00:00+00:00</published>
    <media:group>
      <media:thumbnail url="https://img.youtube.com/vi/test456/mqdefault.jpg"/>
    </media:group>
  </entry>
</feed>`;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// ── Page load ───────────────────────────────────────────────────────────

test.describe("Page load", () => {
  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Yoga with Nancy");
  });
});

// ── Header navigation ──────────────────────────────────────────────────

test.describe("Header navigation", () => {
  test("displays site name link", async ({ page }) => {
    const logo = page.locator("header").getByRole("link", { name: "Yoga with Nancy" });
    await expect(logo).toBeVisible();
  });

  test("nav contains all section links", async ({ page }) => {
    const nav = page.locator("nav");
    for (const label of ["About", "Videos", "DVDs", "Contact"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("nav link scrolls to correct section", async ({ page }) => {
    await page.locator("nav").getByRole("link", { name: "DVDs" }).click();
    await expect(page.locator("#dvds")).toBeInViewport({ timeout: 3000 });
  });
});

// ── Hero section ────────────────────────────────────────────────────────

test.describe("Hero section", () => {
  test("displays heading and location", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /Contemporary Blend of Traditional and Nontraditional Hatha Yoga/,
      })
    ).toBeVisible();
    await expect(page.getByText("Saratoga & San Jose, California")).toBeVisible();
  });
});

// ── About section ───────────────────────────────────────────────────────

test.describe("About section", () => {
  test("has steel blue background with tagline and bio", async ({ page }) => {
    const about = page.locator("#about");
    await expect(about).toHaveCSS("background-color", "rgb(148, 167, 171)");
    await expect(
      about.getByText(/Enjoy harmony in balance/)
    ).toBeVisible();
    await expect(
      about.getByText(/Nancy Portugal Jamello/)
    ).toBeVisible();
  });
});

// ── Photo gallery ───────────────────────────────────────────────────────

test.describe("Photo gallery", () => {
  test("displays 3 gallery images", async ({ page }) => {
    await expect(page.getByAltText("Yoga class - triangle pose")).toBeVisible();
    await expect(page.getByAltText("Nancy with students - tree pose")).toBeVisible();
    await expect(page.getByAltText("Yoga class - warrior II pose")).toBeVisible();
  });
});

// ── Video section: password gate ────────────────────────────────────────

test.describe("Video section - password gate", () => {
  test("shows password input and unlock button when locked", async ({ page }) => {
    await page.locator("#videos").scrollIntoViewIfNeeded();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Unlock" })).toBeVisible();
    await expect(
      page.getByText("Enter your password to access the video collection.")
    ).toBeVisible();
    // video grid must NOT be in the DOM
    await expect(page.locator(".fade-in")).toHaveCount(0);
  });

  test("show/hide password toggle", async ({ page }) => {
    await page.locator("#videos").scrollIntoViewIfNeeded();
    const input = page.getByPlaceholder("Password");
    await expect(input).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: "Show" }).click();
    await expect(input).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: "Hide" }).click();
    await expect(input).toHaveAttribute("type", "password");
  });

  test("shakes and decrements attempts on wrong password", async ({ page }) => {
    await page.locator("#videos").scrollIntoViewIfNeeded();
    const input = page.getByPlaceholder("Password");

    await input.fill("wrong");
    await page.getByRole("button", { name: "Unlock" }).click();
    await expect(page.locator(".shake")).toBeVisible();
    await expect(page.getByText("4 attempts remaining")).toBeVisible();

    await input.fill("stilwrong");
    await page.getByRole("button", { name: "Unlock" }).click();
    await expect(page.getByText("3 attempts remaining")).toBeVisible();
  });

  test("locks after 5 failed attempts", async ({ page }) => {
    await page.locator("#videos").scrollIntoViewIfNeeded();
    const input = page.getByPlaceholder("Password");
    const btn = page.getByRole("button", { name: "Unlock" });

    for (let i = 0; i < 5; i++) {
      await input.fill("wrong");
      await btn.click();
      // wait for shake to clear before next attempt
      await page.waitForTimeout(600);
    }

    await expect(page.getByText("Too many failed attempts. Access locked.")).toBeVisible();
    await expect(input).toBeDisabled();
    await expect(btn).toBeDisabled();
  });

  test("correct password reveals video grid", async ({ page }) => {
    // mock the YouTube RSS proxy
    await page.route("**/api.allorigins.win/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/xml",
        body: MOCK_RSS,
      })
    );

    await page.locator("#videos").scrollIntoViewIfNeeded();
    await page.getByPlaceholder("Password").fill("hathayoga");
    await page.getByRole("button", { name: "Unlock" }).click();

    await expect(page.getByText("Access granted")).toBeVisible();
    await expect(page.locator(".fade-in")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Test Yoga Video")).toBeVisible();
    await expect(page.getByText("Another Yoga Video")).toBeVisible();
    // password input should be gone
    await expect(page.getByPlaceholder("Password")).toHaveCount(0);
  });

  test("Enter key submits password", async ({ page }) => {
    await page.locator("#videos").scrollIntoViewIfNeeded();
    await page.getByPlaceholder("Password").fill("wrong");
    await page.getByPlaceholder("Password").press("Enter");
    await expect(page.getByText("4 attempts remaining")).toBeVisible();
  });
});

// ── DVDs section ────────────────────────────────────────────────────────

test.describe("DVDs section", () => {
  test("displays DVD listings on steel blue background", async ({ page }) => {
    const dvds = page.locator("#dvds");
    await dvds.scrollIntoViewIfNeeded();
    await expect(dvds).toHaveCSS("background-color", "rgb(148, 167, 171)");
    await expect(dvds.getByRole("heading", { name: "Yoga DVDs" })).toBeVisible();
    await expect(dvds.getByText("$20 each")).toBeVisible();
    await expect(dvds.getByText("Yoga with Nancy(2002)", { exact: false })).toBeVisible();
    await expect(dvds.getByText("Yoga for the Blind and Visually Impaired")).toBeVisible();
    await expect(dvds.getByText(/Work it Out Old School/)).toBeVisible();
    await expect(dvds.getByText(/Relax and Renew Meditations/)).toBeVisible();
  });
});

// ── Contact section ─────────────────────────────────────────────────────

test.describe("Contact section", () => {
  test("shows mailing address without phone or email", async ({ page }) => {
    const contact = page.locator("#contact");
    await contact.scrollIntoViewIfNeeded();
    await expect(contact.getByText("Work it Out")).toBeVisible();
    await expect(contact.getByText("P.O. Box 2294")).toBeVisible();
    await expect(contact.getByText("Saratoga, CA 95070")).toBeVisible();
    // no phone or email links
    await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(contact.locator('a[href^="tel:"]')).toHaveCount(0);
  });
});

// ── Footer ──────────────────────────────────────────────────────────────

test.describe("Footer", () => {
  test("shows copyright with current year", async ({ page }) => {
    const year = new Date().getFullYear();
    await expect(
      page.getByText(`© ${year} Nancy Portugal Jamello`)
    ).toBeVisible();
  });
});
