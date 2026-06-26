const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  //  "https://vestitude-admin-backend.onrender.com/api";
  "https://vestitude-admin-backend.onrender.com/api";

const getAuthToken = () => localStorage.getItem("authToken");

const clearAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

const redirectToLogin = () => {
  clearAuth();
  window.location.href = "/login";
};

const parseJwtPayload = (token) => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    return JSON.parse(atob(parts[1]));
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") return false;
  return Math.floor(Date.now() / 1000) >= payload.exp;
};

const apiCall = async (
  endpoint,
  method = "GET",
  body = null,
  requiresAuth = true,
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const token = getAuthToken();
    if (!token) {
      redirectToLogin();
      throw new Error("Unauthorized");
    }

    if (isTokenExpired(token)) {
      redirectToLogin();
      throw new Error("Token expired");
    }

    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      redirectToLogin();
      throw new Error(data.message || "Unauthorized");
    }

    throw new Error(data.message || "API Error");
  }

  return data;
};

export const authApi = {
  login: (email, password) =>
    apiCall("/auth/login", "POST", { email, password }, false),
  register: (email, password, firstName, lastName) =>
    apiCall(
      "/auth/register",
      "POST",
      { email, password, firstName, lastName },
      false,
    ),
  forgotPassword: (email) =>
    apiCall("/auth/forgot-password", "POST", { email }, false),
  resetPassword: (token, password) =>
    apiCall("/auth/reset-password", "POST", { token, password }, false),
  logout: () => apiCall("/auth/logout", "POST"),
};

export const userApi = {
  getProfile: () => apiCall("/users/profile"),
  updateProfile: (data) => apiCall("/users/profile", "PUT", data),
  changePassword: (currentPassword, newPassword) =>
    apiCall("/users/change-password", "POST", { currentPassword, newPassword }),
  getPayments: (userId) => apiCall(`/users/${userId}/payments`),
};

export const investmentApi = {
  getMyInvestments: () => apiCall("/investments/my-investments"),
  getInvestmentDetails: (investmentId) =>
    apiCall(`/investments/${investmentId}`),
  getOpportunities: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/investments/opportunities?${params}`);
  },
};

export const walletApi = {
  getBalance: () => apiCall("/wallet/balance"),
  getTransactionHistory: (limit = 20, offset = 0) =>
    apiCall(`/wallet/transactions?limit=${limit}&offset=${offset}`),
  fundWallet: (amount) => apiCall("/wallet/fund", "POST", { amount }),
  requestWithdrawal: () => apiCall("/wallet/withdraw-request", "POST"),
  withdrawFunds: (amount, bankAccount) =>
    apiCall("/wallet/withdraw", "POST", { amount, bankAccount }),
};

export const dashboardApi = {
  getDashboardData: () => apiCall("/dashboard"),
};

export const getUserById = (id) => {
  getAuthToken(); // Ensure token is included in headers
  return apiCall(`/users/profile/${id}`);
};
