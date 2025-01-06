import { Browser, Page } from "@playwright/test";
import { Environment } from "../tests/env/Env";

export class CommonTestSteps {
  static async getNewPage(browser: Browser, env: Environment): Promise<Page> {
    const context = await browser.newContext();
    await context.grantPermissions(["geolocation"], {
      origin: env.HomePageURL,
    }); //
    const page = await context.newPage();
    return page;
  }

  static async goToHomePage(page: Page, env: Environment) {
    await page.goto(env.HomePageURL);
    await page.click('button:has-text("Accept all")');
  }
}
