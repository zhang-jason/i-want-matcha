import { test, expect } from "@playwright/test";
import productsJson from "../products.json";

const baseURL = "https://www.sazentea.com";

test.describe("Product Availability Tests", () => {
  productsJson.products.forEach(({ name, url }) => {
    test(`Testing with ${name}`, async ({ page }) => {
      await page.goto(baseURL + url);
      await page.waitForLoadState("domcontentloaded");
      let btnAddToCart = page.getByText("ADD to cart", { exact: false });
      expect(btnAddToCart).toBeAttached({ timeout: 3000 });
    });
  });
});
