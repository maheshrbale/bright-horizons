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
    this.searchField = page.locator("#subnav-search-desktop-top input#search-field");
    this.searchButton = page.locator('#subnav-search-desktop-top button[type="submit"]');
    const navList = page.locator(".nav-list-wrap .displayed-desktop");
    this.findACenterLink = navList
      .getByRole("link", { name: "Find a Center" }).last();
  }

  getSearchField(): Locator {
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
