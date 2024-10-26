import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncHandler from "../utils/AsyncHandler";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      // Validation: Ensure all fields are filled
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return {
          sucess: false,
          message: "Please fill all the fields",
        };
      }

      // Axios POST request
      const response = await axios.post("/api/products", newProduct, {
        headers: { "Content-Type": "application/json" },
      });
      // Return the created product data
      return {
        success: true,
        data: response.data.data,
        message: "Product created sucessfully",
      };
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: "Somthing went wrong while creating product",
      });
    }
  }
);

//Fetch the products
export const fetchProducts = createAsyncThunk(
  "products/fetchPoducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");
      return response.data.data;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: "Somthing went wrong while fetching product",
      });
    }
  }
);

//Delete the product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (!response.data.success) {
        return rejectWithValue(response.data);
      }
      return { response: response.data };
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: "Somthing went wrong while deleting product",
      });
    }
  }
);

//Update the product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updateProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, updateProduct, {
        headers: { "Content-Type": "application/json" },
      });
      return {
        success: true,
        data: response.data.data,
        message: "Product updated sucessfully",
      };
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: "Somthing went wrong while updating product",
      });
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    error: null,
    isLoading: true,
  },

  extraReducers: (builder) => {
    //// Custom handler to add new product (post request)
    asyncHandler(builder, createProduct, (state, action) => {
      state.products.push(action.payload);
    });

    //// Custom handler to fetch products (get request)
    asyncHandler(builder, fetchProducts);

    asyncHandler(builder, deleteProduct, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });

    asyncHandler(builder, updateProduct, (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    });
  },
});

export default productSlice.reducer;
