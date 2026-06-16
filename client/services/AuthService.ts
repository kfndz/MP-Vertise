const AUTH_KEY = "admin_auth_v1";

export const AuthService = {
  login(username: string, password: string): Promise<boolean> {
    // Simple local check - in future replace by real auth
    const ok = username === "admin" && password === "admin123";
    if (ok) {
      localStorage.setItem(AUTH_KEY, "true");
    }
    return Promise.resolve(ok);
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === "true";
  },
};
