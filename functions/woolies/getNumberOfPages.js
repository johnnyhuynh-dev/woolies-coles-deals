/*eslint-disable*/
async function getNumberOfPages(page) {
  try {
    await page.waitForSelector(".paging-section", {
      state: "visible",
      timeout: 15000,
    });
    const numberOfPages = await page.$eval(".paging-section", (el) => {
      const allPages = el.querySelectorAll("a.paging-pageNumber");
      const lastPage = allPages[allPages.length - 1];
      return +lastPage.textContent;
    });

    return numberOfPages;
  } catch (err) {
    console.log(`Unable to get number of pages on this page: ${page.url()}`);
    return null;
  }
}

module.exports = getNumberOfPages;
