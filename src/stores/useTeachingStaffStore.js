import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { getTeachingStaff as fetchTeachingStaffApi, addTeachingStaff as addTeachingStaffApi, updateTeachingStaff as updateTeachingStaffApi, deleteTeachingStaff as deleteTeachingStaffApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useTeachingStaffStore = create(
    persist(
        (set, get) => ({
            teachingStaff: [],
            isLoading: false,
            selectedLevel: 6,
            setTeachingStaff: (teachingStaff) => set({ teachingStaff }),
            getTeachingStaff: async (page = 0, level = 6) => {
                try {
                    set({ isLoading: true, selectedLevel: level });
                    const response = await fetchTeachingStaffApi(page, level);
                    set({ teachingStaff: response.data.results });
                } catch (error) {
                    toast.error(error.response?.data?.detail || "Error fetching teaching staff");
                    console.error("Error fetching teaching staff:", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            addTeachingStaff: async (newTeachingStaffData) => {
                try {
                    set({ isLoading: true });
                    // Ensure role is set to 1 for teaching staff
                    const staffData = { ...newTeachingStaffData, role: 1 };
                    await addTeachingStaffApi(staffData);
                    await get().getTeachingStaff(0, get().selectedLevel);
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
                    // Ensure role is maintained as 1 for teaching staff
                    const staffData = { ...updatedData, role: 1 };
                    await updateTeachingStaffApi(username, staffData);
                    await get().getTeachingStaff(0, get().selectedLevel);
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
                    await get().getTeachingStaff(0, get().selectedLevel);
                    toast.success("Teaching staff deleted successfully!");
                } catch (error) {
                    toast.error(error.response?.data?.detail || "Error deleting teaching staff");
                    console.error("Error deleting teaching staff:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },
            // Helper function to get staff type label based on level
            getStaffTypeLabel: (level) => {
                return level === 6 ? "Teaching Assistant" : level === 7 ? "Teaching Lecturer" : "Unknown";
            }
        }),
        {
            name: 'teaching-staff-storage',
        }
    )
);