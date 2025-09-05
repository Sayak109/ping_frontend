import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:3333";
const API_SLUG: string = process.env.REACT_APP_API_SLUG || "/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response interceptor to handle authentication errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    
    // Handle authentication errors (401, 402)
    if (status === 401 || status === 402) {
      // Check if we're not already on sign-in page to prevent loops
      const currentPath = window.location.pathname;
      if (currentPath !== '/sign-in' && currentPath !== '/signin') {
        console.log('Authentication error detected, redirecting to sign-in page');
        window.location.href = '/sign-in';
      }
    }
    
    return Promise.reject(error);
  }
);

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface GoogleLoginCredential {
  credential: string;
}

// Test API endpoint
export const testAPI = {
  test: (): Promise<AxiosResponse> => api.get(`${API_SLUG}/test`),
};

// Auth API endpoints
export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/signin`, credentials),

  register: (userData: RegisterData): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/signup`, userData),

  logout: (): Promise<AxiosResponse> => api.post(`${API_SLUG}/logout`),

  getUser: (): Promise<AxiosResponse> => api.get(`${API_SLUG}/user/me`),

  googleLogin: (credential: string): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/google`, credential),
};

// URL API endpoints
export const urlAPI = {
  getUrlList: (): Promise<AxiosResponse> =>
    api.get(`${API_SLUG}/url/url-list`),

  shortenUrl: (longUrl: string): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/url/shorten-url`, { long_url: longUrl }),

  deleteUrl: (urlId: string): Promise<AxiosResponse> =>
    api.delete(`${API_SLUG}/url/${urlId}`),
};

export default api;
