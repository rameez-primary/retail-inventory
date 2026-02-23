// src/Controllers/ProductController.ts

import { Request, Response, NextFunction } from "express";
import { ProductService } from "../Services/ProductService";
import { CreateProductRequest, CreateProductInput } from "../Models/Product";

const Service = new ProductService();

// TEMP: hardcode StoreId until auth/multi-store login is added
const DefaultStoreId = "Store_001";

function ToTrimmedString(Value: unknown): string {
  return typeof Value === "string" ? Value.trim() : "";
}

function ToOptionalTrimmedString(Value: unknown): string | undefined {
  const S = ToTrimmedString(Value);
  return S.length > 0 ? S : undefined;
}

export class ProductController {
  // GET /api/v1/products/:barcode
  static async GetByBarcode(Req: Request, Res: Response, Next: NextFunction) {
    try {
      const Barcode = ToTrimmedString(Req.params?.barcode);

      if (!Barcode) {
        return Res
          .status(400)
          .json({ ok: false, error: "barcode param is required" });
      }

      const ProductItem = await Service.GetByBarcode(DefaultStoreId, Barcode);

      return Res.status(200).json({
        ok: true,
        product: ProductItem,
      });
    } catch (Err) {
      return Next(Err);
    }
  }

  // POST /api/v1/products/barcode
  static async CreateOrGetByBarcode(
    Req: Request<{}, {}, CreateProductRequest>,
    Res: Response,
    Next: NextFunction
  ) {
    try {
      const Body = Req.body ?? {};

      const BarcodeValue = ToTrimmedString(Body.Barcode);
      const NameValue = ToTrimmedString(Body.Name);

      if (!BarcodeValue) {
        return Res.status(400).json({ ok: false, error: "Barcode is required" });
      }

      if (!NameValue) {
        return Res.status(400).json({ ok: false, error: "Name is required" });
      }

      const Input: CreateProductInput = {
        StoreId: DefaultStoreId,
        Barcode: BarcodeValue,
        Name: NameValue,
        Brand: ToOptionalTrimmedString(Body.Brand),
        Category: ToOptionalTrimmedString(Body.Category),
        Unit: ToOptionalTrimmedString(Body.Unit),
      };

      const ProductItem = await Service.CreateIfMissing(Input);

      return Res.status(200).json({
        ok: true,
        product: ProductItem,
      });
    } catch (Err) {
      return Next(Err);
    }
  }
}