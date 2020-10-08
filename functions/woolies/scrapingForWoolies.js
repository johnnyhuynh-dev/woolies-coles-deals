/*eslint-disable*/
process.env.PLAYWRIGHT_BROWSERS_PATH = "0";
const getProductsForOneCategory = require("./getProducts");
const playwright = require("playwright-firefox");

const wooliesCategoryList = {
  "health-beauty": "Health & Beauty",
  pantry: "Pantry",
  // household: "Household",
  // drinks: "Drinks",
  // "dairy-eggs-fridge": "Dairy, Eggs & Fridge",
  // liquor: "Liquor",
  // freezer: "Freezer",
  // "meat-seafood-deli": "Meat, Seafood & Deli",
  // baby: "Baby",
  // bakery: "Bakery",
  // pet: "Pet",
  // "lunch-box": "Lunch Box",
};

// Initialize the browser, context and the page
async function scrapingForWoolies(categoryList) {
  const browser = await playwright.firefox.launch({
    headless: true,
  });

  const context = await browser.newContext();

  const wooliesProducts = [];
  // get products for all categories at the same time and await for all of them to be completed
  const results = await Promise.all(
    Object.entries(categoryList).map(async (category) => {
      const page = await context.newPage();
      const productsForEachCategory = await getProductsForOneCategory(
        page,
        category[0],
        category[1]
      );
      return productsForEachCategory;
    })
  );

  // merge products to the array
  results.forEach((productsInEachCategory) => {
    wooliesProducts.push(...productsInEachCategory);
  });

  // end the session
  await browser.close();
  return wooliesProducts;
}

module.exports = scrapingForWoolies;
