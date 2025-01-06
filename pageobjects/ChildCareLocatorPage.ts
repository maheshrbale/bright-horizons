import { Locator, Page } from "playwright";

export class ChildCareCenterSearchResult {
  private title: Locator;
  private distance: Locator;
  private address: Locator;
  //More fields can be added in future

  constructor(resultRow: Locator) {
    this.title = resultRow.locator(".centerResult__name");
    this.distance = resultRow.locator(".centerResult__distance");
    this.address = resultRow.locator(".centerResult__address");
  }

  async viewAddressOnMap() {
    await this.address.click();
  }

  async getTitle(): Promise<string | null> {
    return await this.title.textContent();
  }

  async getAddress(): Promise<string | null> {
    return await this.address.textContent();
  }
}

export class ChildCareCenterMapToolTip {
  private title: Locator;
  private address: Locator;
  //More fields can be added in future

  constructor(resultRow: Locator) {
    this.title = resultRow.locator(".mapTooltip__headline");
    this.address = resultRow.locator(".mapTooltip__address");
  }

  async getTitle(): Promise<string | null> {
    return await this.title.textContent();
  }

  async getAddress(): Promise<string | null> {
    return await this.address.textContent();
  }
}

export class ChildCareLocatorPage {
  private page: Page;
  private addressInputField: Locator;
  private pageLoader: Locator;
  private numCentersResult: Locator;
  private searchResults: Locator;
  private mapToolTip: Locator;
  private findACenterMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressInputField = page.locator("#addressInput");
    this.pageLoader = page.locator(".elipsesLoader.active");
    this.numCentersResult = page.locator(".centerDetails.results");
    this.searchResults = page.locator("div.centerResult");
    this.mapToolTip = page.locator("div.mapTooltip");
    this.findACenterMessage = page.getByText("Enter a location to get started");
  }

  async searchAddress(address: string) {
    await this.pageLoader.waitFor({ state: "detached", timeout: 10000 });
    await this.addressInputField.focus();
    await this.addressInputField.pressSequentially(address, { delay: 10 });
    await this.page.keyboard.press("Enter");
    await this.numCentersResult.waitFor({ state: "visible", timeout: 10000 });
  }

  async getNumberOfSearchedCenters(): Promise<number> {
    const text = await this.numCentersResult.textContent();
    if (text === null) {
      throw new Error(`No Search Results found`);
    }
    return parseInt(text.trim());
  }

  async getFirstSearchResult(): Promise<ChildCareCenterSearchResult> {
    const first = await this.searchResults.first();
    if (first == null) {
      throw new Error(`No Search Results found`);
    }
    return new ChildCareCenterSearchResult(first);
  }

  async getMapToolTip(): Promise<ChildCareCenterMapToolTip> {
    const tooltip = await this.mapToolTip;
    if (tooltip == null) {
      throw new Error(`No Map ToolTip found`);
    }
    return new ChildCareCenterMapToolTip(tooltip);
  }

  async waitForFindACenterMessage() {
    await this.findACenterMessage.waitFor({state: "visible", timeout: 5000});
  }
}
