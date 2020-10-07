/*eslint-disable*/
const getProductsForOneCategory = require("./getProducts");
const playwright = require("playwright");
const jsonfile = require("jsonfile");
const { performance } = require("perf_hooks");

const wooliesCategoryList = {
  // "meat-seafood-deli": "Meat, Seafood & Deli",
  // bakery: "Bakery",
  // "dairy-eggs-fridge": "Dairy, Eggs & Fridge",
  pantry: "Pantry",
  freezer: "Freezer",
  drinks: "Drinks",
  // liquor: "Liquor",
  // pet: "Pet",
  // baby: "Baby",
  // "health-beauty": "Health & Beauty",
  // household: "Household",
  // "lunch-box": "Lunch Box",
};

// Initialize the browser, context and the page
async function scrapingForWoolies(categoryList) {
  const t0 = performance.now();
  const browser = await playwright.firefox.launch({ headless: false });
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

  const t1 = performance.now();

  // Write scraping data into a JSON file
  const fileName = "./wooliesProducts.json";
  const tableObject = {
    table: wooliesProducts,
  };
  jsonfile.writeFile(fileName, tableObject, { spaces: 2 }, function (err) {
    if (err) console.log(err);
  });

  // end the session
  await browser.close();
  console.log(
    `Scraping for Freezer and Drinks takes ${Math.round(
      (t1 - t0) / 1000
    )} seconds`
  );
  return wooliesProducts;
}

scrapingForWoolies(wooliesCategoryList);

module.exports = scrapingForWoolies;
