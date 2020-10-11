/*eslint-disable*/
const functions = require("firebase-functions");
const scrapingForWoolies = require("./woolies/scrapingForWoolies");
const writingToDatabase = require("./functionUtils");
const admin = require("firebase-admin");
const sampleData = require("./woolies/wooliesProducts.json");
admin.initializeApp();

const runtimeOptions = {
  timeoutSeconds: 120,
  runWith: "2GB",
};

const functionLinksOnEmulator = [
  "http://localhost:5001/woolies-coles-deals-18609/us-central1/getHealthPantryHouseholdFromWoolies",
  "http://localhost:5001/woolies-coles-deals-18609/us-central1/getDrinksDairyFromWoolies",
  "http://localhost:5001/woolies-coles-deals-18609/us-central1/getLiquorFreezerFromWoolies",
  "http://localhost:5001/woolies-coles-deals-18609/us-central1/getBakeryPetLunchboxFromWoolies",
];

exports.getHealthPantryHouseholdFromWoolies = functions
  .runWith(runtimeOptions)
  .https.onRequest(async (req, res) => {
    const categoryList = {
      "health-beauty": "Health & Beauty",
      pantry: "Pantry",
      household: "Household",
    };
    const result = await writingToDatabase(scrapingForWoolies, categoryList);
    res.send(result);
  });

exports.getDrinksDairyFromWoolies = functions
  .runWith(runtimeOptions)
  .https.onRequest(async (req, res) => {
    const categoryList = {
      drinks: "Drinks",
      "dairy-eggs-fridge": "Dairy, Eggs & Fridge",
    };
    const result = await writingToDatabase(scrapingForWoolies, categoryList);
    res.send(result);
  });

exports.getLiquorFreezerFromWoolies = functions
  .runWith(runtimeOptions)
  .https.onRequest(async (req, res) => {
    const categoryList = {
      liquor: "Liquor",
      freezer: "Freezer",
    };
    const result = await writingToDatabase(scrapingForWoolies, categoryList);
    res.send(result);
  });

exports.getBakeryPetLunchboxFromWoolies = functions
  .runWith(runtimeOptions)
  .https.onRequest(async (req, res) => {
    const categoryList = {
      bakery: "Bakery",
      pet: "Pet",
      "lunch-box": "Lunch Box",
    };
    const result = await writingToDatabase(scrapingForWoolies, categoryList);
    res.send(result);
  });

exports.writeSampleDataToFirestoreEmulator = functions
  .runWith(runtimeOptions)
  .https.onRequest((req, res) => {
    sampleData.table.forEach((product) => {
      admin.firestore().collection("sampleData").add(product);
    });
    res.send(sampleData);
  });
