const AUTH_KEY = "admin_auth_v1";

export const AuthService = {
  async login(username: string, password: string): Promise<boolean> {
    // Futuramente isso será substituído pela API.
    const authenticated =
      username === "admin" && password === "admin123";

    if (authenticated) {
      localStorage.setItem(AUTH_KEY, "true");
    }

    return authenticated;
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === "true";
  },
};