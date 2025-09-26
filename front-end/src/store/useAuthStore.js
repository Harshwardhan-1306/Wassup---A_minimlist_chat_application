import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js'
import toast, { Toaster } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({ authUser: res.data });
        } catch (error) {
            console.log('Error in checkAuth: ', error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async(data) => {
        set({ isSigningUp: true});

        try {
            let res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data })
            toast.success('Account created successfully');
        } catch (error) {
            toast.error('Sign up failed. Please try again.');
            console.log('Error in Sign Up', error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async(data) => {
        set({ isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        }
        catch(error) {
            const message = error?.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
            console.log('Error in Login', error);
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('User logged out successfully')
        } catch (error) {
            const message = error?.response?.data?.message || 'Logout failed. Please try again.';
            toast.error(message);
            console.log('Error in Logout', error);
        }
    },

    updateProfile: async(data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch(error) {
            const message = error?.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
            console.log("Error in updating profile", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}));