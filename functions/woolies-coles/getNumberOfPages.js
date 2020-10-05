/*eslint-disable*/
async function getNumberOfPages(page) {
  await page.waitForSelector(".paging-section");
  const numberOfPages = await page.$eval(".paging-section", (el) => {
    const allPages = el.querySelectorAll("a.paging-pageNumber");
    const lastPage = allPages[allPages.length - 1];
    return +lastPage.textContent;
  });

  return numberOfPages;
}

module.exports = getNumberOfPages;
