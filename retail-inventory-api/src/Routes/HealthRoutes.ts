import { Router } from "express";

const RouterHealth = Router();

RouterHealth.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "retail-inventory-api",
    timestamp: new Date().toISOString(),
  });
});

export default RouterHealth;