import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { isObjectIdOrHexString } from "mongoose";

// get all products logic
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.error("Error in fetching products", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// add a product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body; // user will send this data

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all field" });
  }

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// update a product
export const updateProduct = async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  if (isObjectIdOrHexString(id)) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error("Error in updating product:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Please enter valid ID" });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (isObjectIdOrHexString(id)) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" }); // Added 404 check
      }
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error in deleting product: ", error);
      res.status(404).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Please enter valid ID" });
  }
};
