import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
const API_SLUG: string = process.env.NEXT_PUBLIC_API_SLUG || "/api/v1";

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

    if (status === 401 || status === 402) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/sign-in") {
        window.location.href = "/sign-in";
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
    api.post(`${API_SLUG}/auth/signin`, credentials),

  register: (userData: RegisterData): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/auth/signup`, userData),

  logout: (): Promise<AxiosResponse> => api.post(`${API_SLUG}/auth/logout`),

  googleLogin: (credential: string): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/auth/google`, credential),
};

// User API endpoints
export const userAPI = {
  getUser: (): Promise<AxiosResponse> => api.get(`${API_SLUG}/user/me`),

  searchUsers: (): Promise<AxiosResponse> => api.get(`${API_SLUG}/user/search`),
};

// Chat API endpoints

export const chatAPI = {
  getChats: (): Promise<AxiosResponse> => api.get(`${API_SLUG}/chats`),

  getMessages: (id: string): Promise<AxiosResponse> =>
    api.get(`${API_SLUG}/chats/messages/${id}`),

  sendMessage: (
    id: string,
    data: { text?: string; image?: File }
  ): Promise<AxiosResponse> => {
    const formData = new FormData();
    if (data.text) formData.append("text", data.text);
    if (data.image) formData.append("image", data.image);

    return api.post(`${API_SLUG}/chats/send-message/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  seenMessage: (id: string): Promise<AxiosResponse> =>
    api.post(`${API_SLUG}/chats/message-seen/${id}`),
};

export default api;
