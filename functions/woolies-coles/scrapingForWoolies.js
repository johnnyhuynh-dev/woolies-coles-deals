/*eslint-disable*/
const getProductsForOneCategory = require("./getProducts");
const playwright = require("playwright");
const jsonfile = require("jsonfile");

const wooliesCategoryList = {
  "meat-seafood-deli": "Meat, Seafood & Deli",
  bakery: "Bakery",
  "dairy-eggs-fridge": "Dairy, Eggs & Fridge",
  pantry: "Pantry",
  freezer: "Freezer",
  drinks: "Drinks",
  liquor: "Liquor",
  pet: "Pet",
  baby: "Baby",
  "health-beauty": "Health & Beauty",
  household: "Household",
  "lunch-box": "Lunch Box",
};

// Initialize the browser, context and the page
(async () => {
  const browser = await playwright.firefox.launch({ headless: true });
  const context = await browser.newContext();

  const wooliesProducts = [];
  for (let category of Object.entries(wooliesCategoryList)) {
    const page = await context.newPage();
    const productsForEachCategory = await getProductsForOneCategory(
      page,
      category[0],
      category[1]
    );
    wooliesProducts.push(...productsForEachCategory);
  }

  // Write scraping data into a JSON file
  // const fileName = "./wooliesProducts.json";
  // const tableObject = {
  //     table: wooliesProducts,
  // };
  // jsonfile.writeFile(fileName, tableObject, { spaces: 2 }, function (err) {
  //     if (err) console.log(err);
  // });

  // end the session
  await browser.close();
})();
