import { create } from "zustand";
import { getProfile as getProfileApi } from "../../API/endpoints";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

export const useProfileStore = create((set) => ({
    personalInfo: null,
    isLoading: false,
    getPersonalInfo: async () => {
        try {
            set({ isLoading: true });
            const username = useAuthStore.getState().fullId;
            if (!username) {
                throw new Error("User is not authenticated.");
            }
            const response = await getProfileApi(username);
            set({ personalInfo: response.data });
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || "Error fetching personal info";
            toast.error(errorMessage);
            console.error("Error fetching personal info:", error);
        } finally {
            set({ isLoading: false });
        }
    },
})); 