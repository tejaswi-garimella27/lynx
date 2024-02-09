import db from "../database.js";
import currencyDetails from "../datasource/currency.json" assert { type: "json" };
import { CONSTANTS } from "../constants.js";

/** Returns the product details by ID  */
export const getProductById = async (productId) => {
  const getProductByIdQuery = "select * from product where id=?;";
  const [rows] = await db.execute(getProductByIdQuery, [productId]);
  return rows[0];
};

/** Increments and updates the count of the productViewed Field  */
export const incrementViewCount = async (productId) => {
  const [rows] = await db.execute(
    "select productViewed from product where id = ?",
    [productId]
  );
  const productViewCount = rows[0].productViewed;
  const a = await db.execute(
    "UPDATE product SET productViewed = ? + 1 WHERE id = ?",
    [productViewCount, productId]
  );
};

/** Fetch the products most viewed based on the productViewed field and limit */
export const getMostViewedProducts = async (limit = 5) => {
  const getMostViewedProductsQuery = `SELECT * FROM product WHERE productViewed > 0 ORDER BY productViewed DESC LIMIT ${limit}`;
  const [rows] = await db.execute(getMostViewedProductsQuery);
  // db.end();
  return rows;
};

/** Since API key is not available comment the logic and used currency.json file to act as response of the API */
export const getConversionRate = (currency) => {
  // const response = await axios.get(`http://api.currencylayer.com/live?access_key=${currencyLayerApiKey}&currencies=${currency}`);
  if (currency === "USD") return CONSTANTS.ONE;
  const rates = currencyDetails.quotes;
  const conversionRate = rates[`USD${currency}`];
  return conversionRate;
};
