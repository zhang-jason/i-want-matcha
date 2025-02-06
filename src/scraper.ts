import { chromium } from "@playwright/test";
import productsJson from "../products.json";

const baseUrl = "https://www.sazentea.com";
const availableProducts: any[] = [];
const unavailableProducts: any[] = [];

export default async function getData() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (let index = 0; index < productsJson.products.length; index++) {
    const product = productsJson.products[index];
    await page.goto(baseUrl + product.url);
    await page.waitForLoadState("domcontentloaded");
    let btnAddToCart = page.getByText("ADD to cart", { exact: false });

    if (await btnAddToCart.isVisible({ timeout: 3000 })) {
      availableProducts.push(product);
      console.log(product.name + " is in stock! Adding to storage");
    } else {
      unavailableProducts.push(product);
      console.log(product.name + " is out of stock");
    }
  }

  await browser.close();
}

export function exportData() {
  return [availableProducts, unavailableProducts];
}

await getData();