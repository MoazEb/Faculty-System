import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { getStudents as fetchStudentsApi, addStudent as addStudentApi, updateStudent as updateStudentApi, deleteStudent as deleteStudentApi, registerFromFile as registerFromFileApi } from "../../API/endpoints";
import toast from "react-hot-toast";
import { LEVEL_MAP } from "../constants/levelMap";

export const useStudentsStore = create(
    persist(
        (set, get) => ({
            students: [],
            isLoading: false,
            filters: { level: 1, gender: "", name: "" }, // Default filters

            setStudents: (students) => set({ students }),

            getStudents: async () => {
                const { filters } = get();
                try {
                    set({ isLoading: true });
                    const params = {
                        page: 0,
                        level: filters.level || 1, // API requires level
                        gender: filters.gender || "",
                        name: filters.name || "",
                    };
                    const response = await fetchStudentsApi(params);
                    set({ students: response.data.results });
                } catch (error) {
                    toast.error(error.response.data.detail || "Error fetching students");
                    console.error("Error fetching students:", error);
                } finally {
                    set({ isLoading: false });
                }
            },

            setFilters: (newFilters) => {
                const oldFilters = get().filters;
                const updatedFilters = { ...oldFilters, ...newFilters };

                if (JSON.stringify(oldFilters) !== JSON.stringify(updatedFilters)) {
                    set({ filters: updatedFilters });
                    get().getStudents();
                }
            },

            addStudent: async (newStudentData) => {
                try {
                    set({ isLoading: true });
                    await addStudentApi(newStudentData);
                    // After adding, filter by the new student's level to show them
                    get().setFilters({ level: newStudentData.level, gender: "", name: "" });
                    toast.success("Student added successfully!");
                } catch (error) {
                    toast.error(error.response.data.errors.userDetails || "Error adding student");
                    console.error("Error adding student:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            updateStudent: async (username, updatedData) => {
                try {
                    set({ isLoading: true });
                    await updateStudentApi(username, updatedData);
                    await get().getStudents(); // Refetch with current filters
                    toast.success("Student updated successfully!");
                } catch (error) {
                    toast.error(error.response.data.detail || "Error updating student");
                    console.error("Error updating student:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteStudent: async (usernamesList) => {
                try {
                    set({ isLoading: true });
                    await deleteStudentApi(usernamesList);
                    await get().getStudents(); // Refetch with current filters
                    toast.success("Student deleted successfully!");
                } catch (error) {
                    toast.error(error.response.data.detail || "Error deleting student");
                    console.error("Error deleting student:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchStudentsByLevel: async (level) => {
                try {
                    const params = {
                        page: 0,
                        level: level,
                        gender: "",
                        name: "",
                    };
                    const response = await fetchStudentsApi(params);
                    return response.data.results;
                } catch (error) {
                    toast.error(error.response.data.detail || "Error fetching students");
                    console.error("Error fetching students:", error);
                    return [];
                }
            },

            registerStudentsFromFile: async (file) => {
                try {
                    set({ isLoading: true });
                    await registerFromFileApi(file);
                    await get().getStudents();
                    toast.success("Students uploaded successfully!");
                } catch (error) {
                    const errorMessage = error.response?.data?.detail || "Error uploading students from file";
                    toast.error(errorMessage);
                    console.error("Error uploading students:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            getStudentLevelLabel: (level) => {
                return LEVEL_MAP[level] || "Unknown";
            }
        }),
        {
            name: 'students-storage',
            partialize: (state) => ({ filters: state.filters }),
        }
    )
);