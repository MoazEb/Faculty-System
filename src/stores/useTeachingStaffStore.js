import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { getTeachingStaff as fetchTeachingStaffApi, addTeachingStaff as addTeachingStaffApi, updateTeachingStaff as updateTeachingStaffApi, deleteTeachingStaff as deleteTeachingStaffApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useTeachingStaffStore = create(
    persist(
        (set, get) => ({
            teachingStaff: [],
            isLoading: false,
            filters: { level: 6, gender: "", name: "" }, // Default filters, 6 for Teaching Assistant

            setTeachingStaff: (teachingStaff) => set({ teachingStaff }),

            getTeachingStaff: async () => {
                const { filters } = get();
                try {
                    set({ isLoading: true });
                    const params = {
                        page: 0,
                        level: filters.level || 6, // API requires level
                        gender: filters.gender || "",
                        name: filters.name || "",
                    };
                    const response = await fetchTeachingStaffApi(params);
                    set({ teachingStaff: response.data.results });
                } catch (error) {
                    toast.error(error.response?.data?.detail || "Error fetching teaching staff");
                    console.error("Error fetching teaching staff:", error);
                } finally {
                    set({ isLoading: false });
                }
            },

            setFilters: (newFilters) => {
                const oldFilters = get().filters;
                const updatedFilters = { ...oldFilters, ...newFilters };

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
                    get().setFilters({ level: staffData.level, gender: "", name: "" });
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
                return level === 6 ? "Assistant" : level === 7 ? "Lecturer" : "Unknown";
            }
        }),
        {
            name: 'teaching-staff-storage',
            partialize: (state) => ({ filters: state.filters }),
        }
    )
);