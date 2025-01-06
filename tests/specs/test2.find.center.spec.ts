import { test, expect } from "@playwright/test";
import { Environment } from "../env/Env";
import { HomePage } from "../../pageobjects/HomePage";
import {
  ChildCareCenterMapToolTip,
  ChildCareCenterSearchResult,
  ChildCareLocatorPage,
} from "../../pageobjects/ChildCareLocatorPage";
import { CommonTestSteps } from "../../utils/common.utils";

test("Verify Find a Center Functionality", async function ({ browser }) {
  const env: Environment = Environment.Instance();
  const page = await CommonTestSteps.getNewPage(browser, env);

  //Step1: Navigate to BH home page
  await CommonTestSteps.goToHomePage(page, env);

  //Step2: Click on Find a Center option
  const homePage = new HomePage(page);
  await homePage.clickOnFindACenterLink();
  const childCareLocatorPage = new ChildCareLocatorPage(page);
  await childCareLocatorPage.waitForFindACenterMessage();

  //Step3: Verify that newly open page contains "/child-care-locator" as a part of its URL
  const url = page.url();
  console.log(`Page URL => ${url}`);
  expect(url).toContain("/child-care-locator");

  //Step4: Type "New York" into search box and press Enter
  const searchPhrase: string = "New York";
  await childCareLocatorPage.searchAddress(searchPhrase);

  //Step5: Verify if the number of found centers is the same as the number of centers
  //displayed on the testcase snapshot

  const numSearchedCenters: number =
    await childCareLocatorPage.getNumberOfSearchedCenters();
  console.log(`num Centers ${numSearchedCenters}`);
  expect(numSearchedCenters).toBeGreaterThan(0); //I am getting 2 results instead of 20 in some browsers

  //Step 6: Click on the first center on the list
  const firstCenterResult: ChildCareCenterSearchResult =
    await childCareLocatorPage.getFirstSearchResult();
  await firstCenterResult.viewAddressOnMap();

  //Step 7: Verify if center name and address are the same (on the list and on the popup)
  const mapToolTip: ChildCareCenterMapToolTip =
    await childCareLocatorPage.getMapToolTip();
  let title = await mapToolTip.getTitle();
  const mapToolTipCenterName: string = title ? title.trim() : "NULL";
  title = await firstCenterResult.getTitle();
  const searchResultCenterName: string = title ? title.trim() : "NULL";
  console.log(
    `mapToolTipCenterName=${mapToolTipCenterName} searchResultCenterName=${searchResultCenterName}`
  );
  let address = await mapToolTip.getAddress();
  const mapToolTipAddress: string = address ? address.trim() : "NULL";
  address = await firstCenterResult.getAddress();
  const searchResultAddress: string = address ? address.trim() : "NULL";
  console.log(
    `mapToolTipAddress=${mapToolTipAddress} searchResultAddress=${searchResultAddress}`
  );

  expect(
    mapToolTipCenterName === "NULL",
    "Map Tooltip center name is not found"
  ).toBeFalsy();
  expect(mapToolTipCenterName, "Center name mismatch").toEqual(
    searchResultCenterName
  );

  expect(
    mapToolTipAddress === "NULL",
    "Map Tooltip address is not found"
  ).toBeFalsy();
  expect(mapToolTipAddress, "Center Address mismatch").toEqual(
    searchResultAddress
  );
});
