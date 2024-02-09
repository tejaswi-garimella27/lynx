import express from "express";
import {
  getProduct,
  getMostViewProductDetails,
} from "../controller/productcontroller.js";

const router = express.Router();

/** Creates the routes and call the controller */

router.get("/product/:id", getProduct);

router.get("/view/product", getMostViewProductDetails);

export default router;
