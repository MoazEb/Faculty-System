import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { getStudents as fetchStudentsApi, addStudent as addStudentApi, updateStudent as updateStudentApi, deleteStudent as deleteStudentApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useStudentsStore = create(
    persist(
        (set, get) => ({
            students: [],
            isLoading: false,
            setStudents: (students) => set({ students }),
            getStudents: async (page = 0, level = 1) => {
                try {
                    set({ isLoading: true });
                    const response = await fetchStudentsApi(page, level);
                    set({ students: response.data.results });
                } catch (error) {
                    toast.error(error.response.data.detail || "Error fetching students");
                    console.error("Error fetching students:", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            addStudent: async (newStudentData) => {
                try {
                    set({ isLoading: true });
                    await addStudentApi(newStudentData);
                    await get().getStudents(0, newStudentData.level);
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
                    await get().getStudents(0, updatedData.level);
                    toast.success("Student updated successfully!");
                } catch (error) {
                    toast.error(error.response.data.detail || "Error updating student");
                    console.error("Error updating student:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },
            deleteStudent: async (usernamesList, level) => {
                try {
                    set({ isLoading: true });
                    await deleteStudentApi(usernamesList);
                    await get().getStudents(0, level);
                    toast.success("Student deleted successfully!");
                } catch (error) {
                    toast.error(error.response.data.detail || "Error deleting student");
                    console.error("Error deleting student:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'students-storage',
        }
    )
);