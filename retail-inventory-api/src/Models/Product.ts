// src/Models/Product.ts

export type ProductId = string;

export type Product = {
  Id: ProductId;
  StoreId: string; // multi-store support later
  Barcode: string;
  Name: string;

  // IMPORTANT (exactOptionalPropertyTypes):
  // If your code sets Brand/Category/Unit to `undefined` explicitly,
  // these must allow `undefined` when present.
  Brand?: string | undefined;
  Category?: string | undefined;
  Unit?: string | undefined;

  CreatedAt: string; // ISO string
  UpdatedAt: string; // ISO string
};

/**
 * Input used internally (Service/Repo) when creating a product
 */
export type CreateProductInput = {
  StoreId: string;
  Barcode: string;
  Name: string;
  Brand?: string | undefined;
  Category?: string | undefined;
  Unit?: string | undefined;
};

/**
 * Raw API request body shape (unknown because it comes from outside)
 * Controller will sanitize into CreateProductInput.
 */
export type CreateProductRequest = {
  Barcode?: unknown;
  Name?: unknown;
  Brand?: unknown;
  Category?: unknown;
  Unit?: unknown;
};

/**
 * Update input for future endpoints (PATCH /products/:id, etc.)
 */
export type UpdateProductInput = Partial<{
  Name: string;
  Brand: string | undefined;
  Category: string | undefined;
  Unit: string | undefined;
}>;

/**
 * (Optional) Raw request shape for update endpoints
 */
export type UpdateProductRequest = {
  Name?: unknown;
  Brand?: unknown;
  Category?: unknown;
  Unit?: unknown;
};