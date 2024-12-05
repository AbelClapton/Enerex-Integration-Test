export class AuthenticationService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }

  async authenticate(credentials) {
    console.log(this.baseUrl);
    const response = await fetch(`${this.baseUrl}/api/login/authorize`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.text();
    this.saveToken(data);
    return data;
  }

  saveToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}

export const authService = new AuthenticationService();
