const AUTH_TOKEN_KEY = "mp_vertise_admin_token";

interface LoginResponse {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
}

export const AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return false;
      }

      const data = (await response.json()) as LoginResponse;

      if (!data.token) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return false;
      }

      localStorage.setItem(AUTH_TOKEN_KEY, data.token);

      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return false;
    }
  },

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
  },

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
};