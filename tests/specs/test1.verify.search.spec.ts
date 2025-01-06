import { test, expect } from "@playwright/test";
import { Environment } from "../env/Env";
import { HomePage } from "../../pageobjects/HomePage";
import { SearchPage, SearchResult } from "../../pageobjects/SearchPage";
import { CommonTestSteps } from "../../utils/common.utils";

test("Verify Search Functionality", async function ({ browser }) {
  const env: Environment = Environment.Instance();
  const page = await CommonTestSteps.getNewPage(browser, env);

  //Step1: Navigate to BH home page
  await CommonTestSteps.goToHomePage(page, env);

  //Step2: Click on search/loop icon
  const homePage = new HomePage(page);
  await homePage.clickOnSearchIcon();

  //Step3: Verify if search field is visible on the page
  expect(
    await homePage.getSearchField(),
    "Search Field is visible"
  ).toBeVisible();

  //Step4: Type "Employee Education in 2018: Strategies to Watch" into the search field
  //and click on the Search button
  const searchPhrase: string =
    "Employee Education in 2018: Strategies to Watch";
  await homePage.search(searchPhrase);
  //await page.waitForTimeout(5000);

  //Step5: Verify if the first search result is exact match to what you typed into search
  const searchPage = new SearchPage(page);
  const firstSearchResult: SearchResult =
    await searchPage.getFirstSearchResult();
  const title = await firstSearchResult.getTitle();
  const firstSearchResultTitle: string = title ? title.trim() : "NULL";
  console.log(
    `searchPhrase=${searchPhrase} firstResultTitle=${firstSearchResultTitle}`
  );
  expect(firstSearchResultTitle, "Search Result title matched").toBe(
    searchPhrase
  );
});
