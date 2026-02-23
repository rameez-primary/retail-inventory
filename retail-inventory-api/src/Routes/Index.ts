import { Router } from "express";
import HealthRoutes from "./HealthRoutes";
import ProductRoutes from "./ProductRoutes";

const Routes = Router();

// Health
Routes.use("/health", HealthRoutes);

// Products
Routes.use("/products", ProductRoutes);

export default Routes;