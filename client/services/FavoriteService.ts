const FAVORITES_KEY = "mp_vertise_favorites";

export const FavoriteService = {
  getAll(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isFavorite(productId: string | number): boolean {
    return this.getAll().includes(String(productId));
  },

  add(productId: string | number) {
    const favorites = this.getAll();
    const id = String(productId);

    if (!favorites.includes(id)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, id]));
    }
  },

  remove(productId: string | number) {
    const id = String(productId);
    const favorites = this.getAll().filter((item) => item !== id);

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  },

  toggle(productId: string | number) {
    if (this.isFavorite(productId)) {
      this.remove(productId);
      return false;
    }

    this.add(productId);
    return true;
  },
};