import { beforeEach, describe, expect, it, vi } from "vitest";

function createStorage() {
  const map = new Map<string, string>();

  return {
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null;
    },
    setItem(key: string, value: string) {
      map.set(key, String(value));
    },
    removeItem(key: string) {
      map.delete(key);
    },
    clear() {
      map.clear();
    },
    key(index: number) {
      return Array.from(map.keys())[index] ?? null;
    },
    get length() {
      return map.size;
    },
  };
}

describe("ProductService", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      value: createStorage(),
      configurable: true,
    });
    Object.defineProperty(globalThis, "sessionStorage", {
      value: createStorage(),
      configurable: true,
    });
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("returns an empty catalog while backend mode is disabled", async () => {
    vi.stubEnv("VITE_DEV_MODE", "false");

    const { ProductService } = await import("./ProductService");
    const products = await ProductService.getAll();

    expect(products).toEqual([]);
  });

  it("returns mock products in development mode", async () => {
    vi.stubEnv("VITE_DEV_MODE", "true");

    const { ProductService } = await import("./ProductService");
    const products = await ProductService.getAll();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("id");
  });
});

describe("AuthService", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.resetModules();
  });

  it("clears auth data from storage on logout", async () => {
    localStorage.setItem("admin_auth_v1", "true");
    sessionStorage.setItem("admin_auth_v1", "true");

    const { AuthService } = await import("./AuthService");
    AuthService.logout();

    expect(localStorage.getItem("admin_auth_v1")).toBeNull();
    expect(sessionStorage.getItem("admin_auth_v1")).toBeNull();
  });
});
