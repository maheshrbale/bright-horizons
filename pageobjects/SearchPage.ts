import { Locator, Page } from "playwright";

export class SearchResult {
  private title: Locator;
  private description: Locator;
  private link: Locator;

  constructor(resultRow) {
    this.title = resultRow.locator(".title");
    this.description = resultRow.locator(".descrption");
    this.link = resultRow.locator(".link");
  }

  async getTitle(): Promise<string | null> {
    return await this.title.textContent();
  }
}

export class SearchPage {
  private searchResults: Locator;

  constructor(page: Page) {
    this.searchResults = page.locator("a.search-result");
  }

  async getFirstSearchResult(): Promise<SearchResult> {
    const first = await this.searchResults.first();
    if (first == null) {
      throw new Error(`No Search Results found`);
    }
    const result = new SearchResult(first);
    return result;
  }
}
