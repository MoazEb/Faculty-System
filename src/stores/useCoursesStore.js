import { create } from "zustand";
import { getCourses as fetchCoursesApi, addCourse as addCourseApi, updateCourse as updateCourseApi, deleteCourse as deleteCourseApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useCoursesStore = create((set, get) => ({
    courses: [],
    isLoading: false,
    isThereNextPage: false,
    filters: { level: 1, semester: 0, name: "", page: 0 },

    setCourses: (courses) => set({ courses }),

    getCourses: async () => {
        const { filters } = get();
        try {
            set({ isLoading: true });
            const params = {
                page: filters.page || 0,
                level: filters.level || 1,
                name: filters.name || "",
            };

            if (filters.semester !== "") {
                params.semester = filters.semester;
            }

            const response = await fetchCoursesApi(params);
            set({ courses: response.data.results, isThereNextPage: response.data.isThereNextPage });
        } catch (error) {
            toast.error(error.response.data.detail || "Error fetching courses");
            console.error("Error fetching courses:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    getAllCourses: async () => {
        try {
            set({ isLoading: true });

            // Define all level and semester combinations
            const levelSemesterCombinations = [
                { level: 1, semester: 1 },
                { level: 1, semester: 2 },
                { level: 2, semester: 1 },
                { level: 2, semester: 2 },
                { level: 3, semester: 1 },
                { level: 3, semester: 2 },
                { level: 4, semester: 1 },
                { level: 4, semester: 2 },
            ];

            const responses = await Promise.all(
                levelSemesterCombinations.map(params =>
                    fetchCoursesApi({ page: 0, ...params })
                )
            );

            // Combine all results
            const allCourses = responses.flatMap(response => response.data.results);

            set({ courses: allCourses });
            return allCourses;
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error fetching all courses");
            console.error("Error fetching all courses:", error);
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
            get().getCourses();
        }
    },

    goToPage: (page) => {
        const { filters } = get();
        const oldFilters = get().filters;
        const updatedFilters = { ...filters, page };

        if (JSON.stringify(oldFilters) !== JSON.stringify(updatedFilters)) {
            set({ filters: updatedFilters });
            get().getCourses();
        }
    },

    addCourse: async (newCourseData) => {
        try {
            set({ isLoading: true });
            await addCourseApi(newCourseData);
            get().setFilters({ level: newCourseData.level, semester: newCourseData.semester, name: "" });
            toast.success("Course added successfully!");
        } catch (error) {
            toast.error(error.response.data.detail || "Error adding course");
            console.error("Error adding course:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateCourse: async (courseId, updatedData) => {
        try {
            set({ isLoading: true });
            await updateCourseApi(courseId, updatedData);
            await get().getCourses();
            toast.success("Course updated successfully!");
        } catch (error) {
            toast.error(error.response.data.detail || "Error updating course");
            console.error("Error updating course:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteCourse: async (id) => {
        try {
            set({ isLoading: true });
            await deleteCourseApi(id);
            await get().getCourses();
            toast.success("Course deleted successfully!");
        } catch (error) {
            toast.error(error.response.data.detail || "Error deleting course");
            console.error("Error deleting course:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));