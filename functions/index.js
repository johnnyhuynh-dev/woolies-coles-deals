/*eslint-disable*/
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const data = require("./woolies-coles/wooliesProducts.json");
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.getDataFromWoolies = functions.https.onRequest((req, res) => {
  res.send(data);
});
