import { products as initialProducts } from "../lib/products";
import { Product, ProductCreateInput } from "../types/product";

const STORAGE_KEY = "admin_products_v1";
const DEV_MODE =
  import.meta.env.VITE_DEV_MODE === "true" ||
  (import.meta.env.DEV && import.meta.env.VITE_DEV_MODE !== "false");

function cloneProduct(product: Product): Product {
  return {
    ...product,
    images: product.images ? [...product.images] : [],
    image: product.image ?? undefined,
  };
}

function cloneProducts(products: Product[]): Product[] {
  return products.map((product) => cloneProduct(product));
}

function createInitialData(): Product[] {
  if (!DEV_MODE) return [];
  return cloneProducts(initialProducts);
}

function loadData(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed)) {
        return cloneProducts(parsed);
      }
    }
  } catch {
    // ignore and fall back to mock data in development mode
  }

  return createInitialData();
}

function saveData(data: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage failures
  }
}

let data: Product[] = loadData();

export const ProductService = {
  async getAll(): Promise<Product[]> {
    return Promise.resolve(cloneProducts(data));
  },

  async getById(id: number): Promise<Product | undefined> {
    const found = data.find((product) => product.id === id);
    return Promise.resolve(found ? cloneProduct(found) : undefined);
  },

  async create(input: ProductCreateInput): Promise<Product> {
    const nextId = data.length ? Math.max(...data.map((product) => product.id)) + 1 : 1;
    const newProduct: Product = { id: nextId, ...input } as Product;
    data = [newProduct, ...data];
    saveData(data);
    return Promise.resolve(cloneProduct(newProduct));
  },

  async update(id: number, patch: Partial<ProductCreateInput>): Promise<Product | undefined> {
    const idx = data.findIndex((product) => product.id === id);
    if (idx === -1) return Promise.resolve(undefined);
    data[idx] = { ...data[idx], ...patch };
    saveData(data);
    return Promise.resolve(cloneProduct(data[idx]));
  },

  async remove(id: number): Promise<boolean> {
    const idx = data.findIndex((product) => product.id === id);
    if (idx === -1) return Promise.resolve(false);
    data.splice(idx, 1);
    saveData(data);
    return Promise.resolve(true);
  },

  async resetToInitial() {
    data = createInitialData();
    saveData(data);
    return Promise.resolve();
  },
};
