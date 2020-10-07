// /*eslint-disable*/
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const runtimeOptions = {
//   timeoutSeconds: 120,
//   memory: "2GB",
// };

// const wooliesCategoryList = {
//   "meat-seafood-deli": "Meat, Seafood & Deli",
//   // bakery: "Bakery",
//   "dairy-eggs-fridge": "Dairy, Eggs & Fridge",
//   pantry: "Pantry",
//   // freezer: "Freezer",
//   // drinks: "Drinks",
//   // liquor: "Liquor",
//   // pet: "Pet",
//   // baby: "Baby",
//   // "health-beauty": "Health & Beauty",
//   // household: "Household",
//   // "lunch-box": "Lunch Box",
// };

// const scrapingForWoolies = require("./woolies/scrapingForWoolies");
// admin.initializeApp();

// exports.getDataFromWoolies = functions
//   .runWith(runtimeOptions)
//   .https.onRequest(async (req, res) => {
//     const products = await scrapingForWoolies(wooliesCategoryList);

//     res.send(products);
//   });
