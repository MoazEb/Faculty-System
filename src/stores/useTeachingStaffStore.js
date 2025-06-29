// src/stores/useTeachingStaffStore.js

import { create } from "zustand";
import { getTeachingStaff as fetchTeachingStaffApi, addTeachingStaff as addTeachingStaffApi, updateTeachingStaff as updateTeachingStaffApi, deleteTeachingStaff as deleteTeachingStaffApi } from "../../API/endpoints";
import toast from "react-hot-toast";
import { LEVEL_MAP } from "../constants/levelMap";

export const useTeachingStaffStore = create((set, get) => ({
    teachingStaff: [],
    isLoading: false,
    isThereNextPage: false,
    filters: { level: 6, gender: "", name: "", page: 0 },

    setTeachingStaff: (teachingStaff) => set({ teachingStaff }),

    getTeachingStaff: async () => {
        const { filters } = get();
        try {
            set({ isLoading: true });
            const params = {
                page: filters.page || 0,
                level: filters.level || 6,
                gender: filters.gender || "",
                name: filters.name || "",
            };
            const response = await fetchTeachingStaffApi(params);
            set({ teachingStaff: response.data.results, isThereNextPage: response.data.isThereNextPage });
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error fetching teaching staff");
            console.error("Error fetching teaching staff:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    getAllTeachingStaff: async () => {
        try {
            set({ isLoading: true });
            // Fetch all teaching levels from 6 to 10
            const teachingLevels = [6, 7, 8, 9, 10];
            const staffPromises = teachingLevels.map(level =>
                fetchTeachingStaffApi({ page: 0, level, gender: "", name: "" })
            );

            const responses = await Promise.all(staffPromises);
            const allStaff = responses.flatMap(res => res.data.results);

            console.log("all staff", allStaff);
            set({ teachingStaff: allStaff });
            return allStaff;
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error fetching all teaching staff");
            console.error("Error fetching all teaching staff:", error);
            return [];
        } finally {
            set({ isLoading: false });
        }
    },

    setFilters: (newFilters) => {
        const oldFilters = get().filters;
        const updatedFilters = { ...oldFilters, ...newFilters, page: 0 };

        if (JSON.stringify(oldFilters) !== JSON.stringify(updatedFilters)) {
            set({ filters: updatedFilters });
            get().getTeachingStaff();
        }
    },

    goToPage: (page) => {
        const { filters } = get();
        const oldFilters = get().filters;
        const updatedFilters = { ...filters, page };

        if (JSON.stringify(oldFilters) !== JSON.stringify(updatedFilters)) {
            set({ filters: updatedFilters });
            get().getTeachingStaff();
        }
    },

    addTeachingStaff: async (newTeachingStaffData) => {
        try {
            set({ isLoading: true });
            const staffData = { ...newTeachingStaffData, role: 1 };
            await addTeachingStaffApi(staffData);
            // After adding, filter by the new staff's level to show them
            set({ filters: { level: staffData.level, gender: "", name: "" } });
            toast.success("Teaching staff added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.errors?.userDetails || "Error adding teaching staff");
            console.error("Error adding teaching staff:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateTeachingStaff: async (username, updatedData) => {
        try {
            set({ isLoading: true });
            const staffData = { ...updatedData, role: 1 };
            await updateTeachingStaffApi(username, staffData);
            await get().getTeachingStaff(); // Refetch with current filters
            toast.success("Teaching staff updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error updating teaching staff");
            console.error("Error updating teaching staff:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteTeachingStaff: async (usernamesList) => {
        try {
            set({ isLoading: true });
            await deleteTeachingStaffApi(usernamesList);
            await get().getTeachingStaff(); // Refetch with current filters
            toast.success("Teaching staff deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error deleting teaching staff");
            console.error("Error deleting teaching staff:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    getStaffTypeLabel: (level) => {
        return LEVEL_MAP[level] || "Unknown";
    }
}));