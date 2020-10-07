const data = require("./wooliesProducts.json");
const express = require("express");
const app = express();
const port = 3000;

// catches requests made to localhost:3000/
app.get("/", (req, res) => res.send("hello word"));
app.get("/data-scraping", (req, res) => res.send(data));
app.listen(port, () => console.log(`Example app listening on port ${port}`));
