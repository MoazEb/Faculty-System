import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { getCourses as fetchCoursesApi, addCourse as addCourseApi, updateCourse as updateCourseApi, deleteCourse as deleteCourseApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useCoursesStore = create(
    persist(
        (set, get) => ({
            courses: [],
            isLoading: false,
            setCourses: (courses) => set({ courses }),
            getCourses: async (page = 0, level = 1) => {
                try {
                    set({ isLoading: true });
                    const response = await fetchCoursesApi(page, level);
                    set({ courses: response.data.results });
                } catch (error) {
                    toast.error(error.response.data.detail || "Error fetching courses");
                    console.error("Error fetching courses:", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            addCourse: async (newCourseData) => {
                console.log(newCourseData);
                try {
                    set({ isLoading: true });
                    const response = await addCourseApi(newCourseData);
                    // set((state) => ({ courses: [...state.courses, response.data.results] }));
                    await get().getCourses();
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
                    const response = await updateCourseApi(courseId, updatedData);
                    console.log(response.data);
                    set((state) => ({
                        courses: state.courses.map((course) =>
                            course.id === courseId ? { ...course, ...response.data } : course
                        ),
                    }));
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
                    set((state) => ({ courses: state.courses.filter((course) => course.id !== id) }));
                    toast.success("Course deleted successfully!");
                } catch (error) {
                    toast.error(error.response.data.detail || "Error deleting course");
                    console.error("Error deleting course:", error);
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'courses-storage',
        }
    )
);