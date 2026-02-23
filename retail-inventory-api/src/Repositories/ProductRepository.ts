// src/Repositories/ProductRepository.ts

import {
  CreateProductInput,
  Product,
  ProductId,
  UpdateProductInput,
} from "../Models/Product";
import { MakeId } from "../Utils/MakeId";
import { NowIso } from "../Utils/NowIso";

export class ProductRepository {
  // In-memory store for now (swap with DB later)
  private ProductsById = new Map<ProductId, Product>();
  private ProductIdByStoreAndBarcode = new Map<string, ProductId>();

  private MakeStoreBarcodeKey(StoreId: string, Barcode: string) {
    return `${StoreId}::${Barcode}`;
  }

  async GetByBarcode(StoreId: string, Barcode: string): Promise<Product | null> {
    const Key = this.MakeStoreBarcodeKey(StoreId, Barcode);
    const Id = this.ProductIdByStoreAndBarcode.get(Key);
    if (!Id) return null;

    return this.ProductsById.get(Id) ?? null;
  }

  async Create(Input: CreateProductInput): Promise<Product> {
    const Id = MakeId("Product") as ProductId;
    const Timestamp = NowIso();

    const NewProduct: Product = {
      Id,
      StoreId: Input.StoreId,
      Barcode: Input.Barcode,
      Name: Input.Name,

      // These may be string | undefined (matches our Models/Product.ts)
      Brand: Input.Brand,
      Category: Input.Category,
      Unit: Input.Unit,

      CreatedAt: Timestamp,
      UpdatedAt: Timestamp,
    };

    const Key = this.MakeStoreBarcodeKey(Input.StoreId, Input.Barcode);

    this.ProductsById.set(Id, NewProduct);
    this.ProductIdByStoreAndBarcode.set(Key, Id);

    return NewProduct;
  }

  async UpdateById(Id: ProductId, Patch: UpdateProductInput): Promise<Product | null> {
    const Existing = this.ProductsById.get(Id);
    if (!Existing) return null;

    // NOTE: Patch can include Brand/Category/Unit as `undefined` (allowed by model)
    const Updated: Product = {
      ...Existing,
      ...Patch,
      UpdatedAt: NowIso(),
    };

    this.ProductsById.set(Id, Updated);
    return Updated;
  }
}