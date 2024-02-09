/** Exporting env variables from one file avoids changing values in multiples files */
export const ENV = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  SERVER_PORT: process.env.SERVER_PORT,
  CURRENCY_API_KEY: process.env.CURRENCY_API_KEY,
};

/** Exporting as CONSTANTS from one file maintains the readability and allows to find all messages at one place */
export const CONSTANTS = {
  UNABLE_TO_FETCH_PRODUCT_WITH_ID:
    "Unable to fetch the product with ID, Please re-try again",
  UNABLE_TO_FETCH_MOST_VIEWED_PRODUCTS:
    "Unable to fetch the most viewed products, Please re-try again",
  INVALID_CURRENCY: "Invalid currency",
  INVALID_LIMIT: "Invalid Limit, Please enter limit greater than 0",
  ONE: 1,
};
