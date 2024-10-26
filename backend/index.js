import express from "express";
import { connectDB } from "./db/db.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware - to convert user input to json format
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server stared at http://localhost:${port}`);
});
