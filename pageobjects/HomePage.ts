import { Locator, Page } from "playwright";
export class HomePage {
  private searcher: Locator;
  private searchField: Locator;
  private searchButton: Locator;
  private findACenterLink: Locator;

  constructor(page: Page) {
    this.searcher = page.locator(
      'a[href="#subnav-search-desktop-top"] .icon-search'
    );
    this.searchField = page.locator("#search-field:visible");
    this.searchButton = page.locator("button.btn-search:visible");
    this.findACenterLink = page
      .getByRole("link", { name: "Find a Center" })
      .last();
  }

  getSearchField() {
    return this.searchField;
  }

  async clickOnSearchIcon() {
    await this.searcher.click();
  }

  async search(text: string) {
    await this.searchField.fill(text);
    await this.searchButton.click();
  }

  async clickOnFindACenterLink() {
    await this.findACenterLink.click();
  }
}
