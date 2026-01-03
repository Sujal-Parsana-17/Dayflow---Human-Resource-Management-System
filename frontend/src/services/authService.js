import api from "./api";
import { API_ENDPOINTS } from "@utils/constants";

export const authService = {
  // Sign Up
  signUp: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);

      // Mark as new user for dashboard welcome
      localStorage.setItem("isNewUser", "true");

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Sign In
  signIn: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SIGNIN, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Sign Out
  signOut: async () => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get Current User
  getCurrentUser: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
