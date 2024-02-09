/** Add type:module in package.json to use imports (es6) */
import express from "express";
import { ENV } from "./src/constants.js";
import productRouter from "./src/routes/product.js";

const app = express();

app.use(express.json());

app.use(productRouter);

/** Connect to Server */
app.listen(ENV.SERVER_PORT, () => {
  console.log(`Hello I am listening on port: " ${ENV.SERVER_PORT}`);
});
