// Centralized API client, can be extended for auth headers, error handling, etc.
const API_BASE_URL = '/api';

const ApiClient = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`);
    return await response.json();
  },
  post: async (endpoint: string, data: any, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`);
    return await response.json();
  },
  // Extend with put, delete as needed
};

export default ApiClient;