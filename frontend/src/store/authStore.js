import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useAuthStore = create((set) => ({
  // initial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  // functions

  signup: async (username, email, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error Signing up";
      set({
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const { user, message } = response.data;

      set({
        user,
        message,
        isLoading: false,
      });

      return { user, message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error logging in";
      set({
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/fetch-user`);
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({
        fetchingUser: false,
        error: null,
        user: null,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/logout`);
      const { message } = response.data;
      set({
        message,
        isLoading: false,
        user: null,
        error: null,
      });

      return { message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error logging out";
      set({
        isLoading: false,
        error: errorMessage,
      });

      throw new Error(errorMessage);
    }
  },
}));

