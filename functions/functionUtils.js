const admin = require("firebase-admin");

// general scraping function to split scraping through multiple functions
async function writingToDatabase(scrapingForWoolies, categoryList) {
  const products = await scrapingForWoolies(categoryList);

  // writing to the database
  const scrapingDate = "07102020";
  const db = admin.firestore().collection(scrapingDate);
  products.forEach((product) => {
    db.add(product);
  });
  return products;
}

module.exports = writingToDatabase;
