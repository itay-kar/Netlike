import { create } from 'zustand';
import axios from '../lib/axios';

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,

    signup: async ({ email, username, password }) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post('/auth/signup', { email, username, password });
            set({ user: res.data.user, isLoading: false });
        } catch (err) {
            const msg = err.response?.data?.message || 'Signup failed';
            set({ error: msg, isLoading: false });
            throw new Error(msg);
        }
    },

    login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post('/auth/login', { email, password });
            set({ user: res.data.user, isLoading: false });
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            set({ error: msg, isLoading: false });
            throw new Error(msg);
        }
    },

    logout: async () => {
        try {
            await axios.post('/auth/logout');
        } finally {
            set({ user: null });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const res = await axios.get('/auth/me');
            set({ user: res.data.user, isLoading: false });
        } catch {
            set({ user: null, isLoading: false });
        }
    },
}));
