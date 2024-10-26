import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// POST add a product
router.post("/", createProduct);

// PATCH update a product
router.patch("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

export default router;
