import * as productModel from "../model/product.js";
import { CONSTANTS } from "../constants.js";
/** Validations are done in the controller and fetch logic */
export const getProduct = async (req, resp) => {
  try {
    const { id } = req.params;
    const promisesList = [
      productModel.getProductById(id),
      productModel.incrementViewCount(id),
    ];
    if (!req.query.currency) {
      const [productResp] = await Promise.all(promisesList);
      return resp.json(productResp);
    }

    const currency = req.query.currency.toUpperCase();
    if (currency !== "USD" && currency !== "CAD") {
      return resp.status(400).json({ error: CONSTANTS.INVALID_CURRENCY });
    }
    promisesList.push(productModel.getConversionRate(currency));
    const [productResp, , conversionRate] = await Promise.all(promisesList);

    productResp.price = (productResp.price * conversionRate).toFixed(2);
    productResp.currency = currency;

    return resp.json(productResp);
  } catch (error) {
    return resp.status(500).json(CONSTANTS.UNABLE_TO_FETCH_PRODUCT_WITH_ID);
  }
};

export const getMostViewProductDetails = async (req, resp) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    if (limit === 0)
      return resp.status(400).json({ error: CONSTANTS.INVALID_LIMIT });

    if (!req.query.currency) {
      const productResp = await productModel.getMostViewedProducts(limit);
      return resp.json(productResp);
    }

    const currency = req.query.currency.toUpperCase();
    if (currency !== "USD" && currency !== "CAD") {
      return resp.status(400).json({ error: CONSTANTS.INVALID_CURRENCY });
    }

    const [productResp, conversionRate] = await Promise.all([
      productModel.getMostViewedProducts(limit),
      productModel.getConversionRate(currency),
    ]);

    const productsWithNewCurrency = productResp.map((eachProduct) => {
      eachProduct.price = (eachProduct.price * conversionRate).toFixed(2);
      eachProduct.currency = currency;
      return eachProduct;
    });
    return resp.json(productsWithNewCurrency);
  } catch (error) {
    return resp
      .status(500)
      .json(CONSTANTS.UNABLE_TO_FETCH_MOST_VIEWED_PRODUCTS);
  }
};
