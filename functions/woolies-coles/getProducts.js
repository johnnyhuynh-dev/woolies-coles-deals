/*eslint-disable*/
const { getRandomInt } = require("./utils");
const getNumberOfPages = require("./getNumberOfPages");

// For all products in one category
async function getProductsForOneCategory(page, categoryURL, categoryName) {
  const destination = `https://www.woolworths.com.au/shop/browse/${categoryURL}/${categoryURL}-specials?pageNumber=1`;
  await page.goto(destination);

  // Get the total number of pages we need to get data from
  const numberOfPages = await getNumberOfPages(page);
  if (!numberOfPages) return;

  // Get products for all pages
  const data = await getProductsForMultiplePages(
    page,
    categoryName,
    numberOfPages,
    categoryURL
  );
  page.close();
  return data;
}

// Products in all pages in each category
async function getProductsForMultiplePages(
  page,
  categoryName,
  numberOfPages,
  categoryURL
) {
  // Loop through all pages, scrape data and store it in the array allProducts
  const allProducts = [];
  for (let i = 1; i <= 1; i++) {
    const scrapingURL =
      `https://www.woolworths.com.au/shop/browse/${categoryURL}/${categoryURL}-specials` +
      `?pageNumber=${i}`;
    // no need to switch page if it's already on the first page
    i === 1 ? null : await page.goto(scrapingURL);

    const productsForEachPage = await getProductsForASinglePage(
      page,
      categoryName
    );
    allProducts.push(...productsForEachPage);

    // no need to wait if it's the last page
    i === 1
      ? await page.waitForTimeout(0)
      : await page.waitForTimeout(getRandomInt(2000, 3000));
  }
  return allProducts;
}

// Products in a single page
async function getProductsForASinglePage(page, categoryName) {
  // wait for the page to load completely
  await page.waitForLoadState();
  await page.waitForSelector("section.shelfProductTile", {
    visible: true,
  });
  await page.waitForTimeout(3000);

  const data = await page.evaluate((category) => {
    const cards = document.querySelectorAll(".product-grid--tile");

    // If there is no card selected, return immediately
    if (!cards) return [];
    const products = Array.from(cards).map((card) => {
      try {
        // Checking the availability of a product
        if (!card.querySelector("div.price")) return {};

        // Product name
        const productNameQuery = card.querySelector(
          "a.shelfProductTile-descriptionLink"
        );
        const productName = productNameQuery
          ? productNameQuery.textContent.replace(/  +/g, " ")
          : null;

        // Photo
        const imageURLQuery = card.querySelector(
          "a.shelfProductTile-imageWrapper img.shelfProductTile-image"
        );
        const imageURL = imageURLQuery ? imageURLQuery.src : null;

        // Pricing
        const discountedPriceDollar = card.querySelector(
          "div.price span.price-dollars"
        ).textContent;

        const discountedPriceCent = card.querySelector(
          "div.price span.price-cents"
        ).textContent;

        const discountedPrice =
          Math.round(
            (+discountedPriceDollar +
              +discountedPriceCent / 100 +
              Number.EPSILON) *
              100
          ) / 100;

        const originalPriceQuery = card.querySelector("div.price-was");
        const originalPrice = originalPriceQuery
          ? Number(originalPriceQuery.textContent.match(/\d*\.\d*/g))
          : null;

        // Discount Percentage

        const percent = originalPrice
          ? Math.round(
              ((originalPrice - discountedPrice) * 100) / originalPrice
            )
          : null;

        // Unit Price
        const unitPriceQuery = card.querySelector(
          "div.shelfProductTile-cupPrice"
        );
        const unitPrice = unitPriceQuery
          ? unitPriceQuery.textContent
          : "No unit price available";

        // Saving Amount
        const notRoundedSavings = percent
          ? originalPrice - discountedPrice
          : null;
        const savings =
          Math.round((notRoundedSavings + Number.EPSILON) * 100) / 100;

        // In store or online only
        const onlineOnly =
          !!card.querySelector(
            'img.shelfProductTagImage-image[alt="Online Only Offer"]'
          ) || false;

        return {
          brand: "Woolworths",
          productName,
          category,
          imageURL,
          discountedPrice,
          originalPrice,
          percent,
          savings,
          unitPrice,
          onlineOnly,
        };
      } catch (err) {
        console.log(err);
        return {};
      }
    });

    return products
      ? products.filter((product) => Object.keys(product).length !== 0)
      : [];
  }, categoryName);

  return data;
}

module.exports = getProductsForOneCategory;
