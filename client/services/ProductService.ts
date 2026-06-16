import { products as initialProducts } from "../lib/products";
import { Product, ProductCreateInput } from "../types/product";

const STORAGE_KEY = "admin_products_v1";

function loadData(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Product[];
  } catch (e) {
    // ignore
  }
  // clone initial products to avoid mutating original
  return initialProducts.map((p) => ({ ...p, images: p.images ? [...p.images] : [] }));
}

function saveData(data: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let data: Product[] = loadData();

export const ProductService = {
  async getAll(): Promise<Product[]> {
    // simulate latency
    return Promise.resolve(JSON.parse(JSON.stringify(data)));
  },

  async getById(id: number): Promise<Product | undefined> {
    const found = data.find((p) => p.id === id);
    return Promise.resolve(found ? JSON.parse(JSON.stringify(found)) : undefined);
  },

  async create(input: ProductCreateInput): Promise<Product> {
    const nextId = data.length ? Math.max(...data.map((p) => p.id)) + 1 : 1;
    const newProduct: Product = { id: nextId, ...input } as Product;
    data = [newProduct, ...data];
    saveData(data);
    return Promise.resolve(JSON.parse(JSON.stringify(newProduct)));
  },

  async update(id: number, patch: Partial<ProductCreateInput>): Promise<Product | undefined> {
    const idx = data.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(undefined);
    data[idx] = { ...data[idx], ...patch };
    saveData(data);
    return Promise.resolve(JSON.parse(JSON.stringify(data[idx])));
  },

  async remove(id: number): Promise<boolean> {
    const idx = data.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(false);
    data.splice(idx, 1);
    saveData(data);
    return Promise.resolve(true);
  },

  // utility for dev/testing
  async resetToInitial() {
    data = initialProducts.map((p) => ({ ...p, images: p.images ? [...p.images] : [] }));
    saveData(data);
    return Promise.resolve();
  },
};
