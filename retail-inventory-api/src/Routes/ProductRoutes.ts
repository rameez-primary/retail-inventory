import { Router } from "express";
import { ProductController } from "../Controllers/ProductController";

const ProductRoutes = Router();

// IMPORTANT:
// base path will already be /api/v1/products

// GET /api/v1/products/:barcode
ProductRoutes.get("/:barcode", ProductController.GetByBarcode);

// POST /api/v1/products/barcode
ProductRoutes.post("/barcode", ProductController.CreateOrGetByBarcode);

export default ProductRoutes;