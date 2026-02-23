import { ProductRepository } from "../Repositories/ProductRepository";
import { CreateProductInput, Product } from "../Models/Product";

export class ProductService {
  private Repo: ProductRepository;

  constructor(Repo = new ProductRepository()) {
    this.Repo = Repo;
  }

  async GetByBarcode(StoreId: string, Barcode: string): Promise<Product | null> {
    return this.Repo.GetByBarcode(StoreId, Barcode);
  }

  async CreateIfMissing(Input: CreateProductInput): Promise<Product> {
    // Basic validation (expand later)
    if (!Input.Barcode?.trim()) throw new Error("Barcode is required");
    if (!Input.Name?.trim()) throw new Error("Name is required");

    const Existing = await this.Repo.GetByBarcode(Input.StoreId, Input.Barcode);
    if (Existing) return Existing;

    return this.Repo.Create({
      ...Input,
      Barcode: Input.Barcode.trim(),
      Name: Input.Name.trim(),
      Brand: Input.Brand?.trim() || undefined,
      Category: Input.Category?.trim() || undefined,
      Unit: Input.Unit?.trim() || undefined,
    });
  }
}