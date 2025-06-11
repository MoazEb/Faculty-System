import { create } from "zustand";
import { getCourseDependencies, addCourseDependency, deleteCourseDependency, getCourses } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useDependenciesStore = create(
    (set, get) => ({
        childDependencies: [],
        parentDependencies: [],
        allCourses: [],
        isLoading: false,
        isFetchingData: false,
        selectedCourseToAdd: "",

        setSelectedCourseToAdd: (courseId) => set({ selectedCourseToAdd: courseId }),

        fetchAllData: async (courseId) => {
            if (!courseId) return;
            set({ isFetchingData: true });
            try {
                const [depsResponse, ...courseResponses] = await Promise.all([
                    getCourseDependencies(courseId),
                    getCourses({ page: 0, level: "", semester: 1 }),
                    getCourses({ page: 0, level: "", semester: 2 }),
                ]);

                const childDependencies = depsResponse.data?.childs || [];
                const parentDependencies = depsResponse.data?.parents || [];
                const allCourses = courseResponses.flatMap(res => res.data.results || (Array.isArray(res.data) ? res.data : []));

                set({
                    childDependencies,
                    parentDependencies,
                    allCourses,
                });
            } catch (error) {
                console.error("Failed to fetch dependencies or courses:", error);
                toast.error("Failed to load initial dependency data or courses list.");
                set({
                    childDependencies: [],
                    parentDependencies: [],
                    allCourses: [],
                });
            } finally {
                set({ isFetchingData: false });
            }
        },

        handleAddChildDependency: async (courseId) => {
            const { selectedCourseToAdd: childCourseId, childDependencies, parentDependencies } = get();
            if (!childCourseId) {
                toast.error("Please select a course to add as a pre-requisite.");
                return;
            }

            if (childDependencies.some(dep => dep.id === childCourseId) || parentDependencies.some(dep => dep.id === childCourseId)) {
                toast.error("This course is already related as a dependency.");
                return;
            }
            if (courseId === childCourseId) {
                toast.error("A course cannot depend on itself.");
                return;
            }

            set({ isLoading: true });
            try {
                await addCourseDependency(courseId, [childCourseId]);
                toast.success("Pre-requisite added successfully.");
                await get().fetchAllData(courseId);
                set({ selectedCourseToAdd: "" });
            } catch (error) {
                console.error("Failed to add pre-requisite:", error);
                const errorMessage = error.response?.data?.message || error.response?.data?.Message || "Failed to add pre-requisite.";
                toast.error(errorMessage);
                throw error;
            } finally {
                set({ isLoading: false });
            }
        },

        handleDeleteDependency: async (courseId, parentId) => {
            set({ isLoading: true });
            try {
                await deleteCourseDependency(courseId, [parentId]);
                toast.success("Dependency relationship removed successfully.");
                await get().fetchAllData(courseId);
            } catch (error) {
                console.error("Failed to remove dependency for parent course:", error);
                toast.error(error.response?.data?.detail || "Failed to remove dependency.");
                throw error;
            } finally {
                set({ isLoading: false });
            }
        },

        resetDependencies: () => {
            set({
                childDependencies: [],
                parentDependencies: [],
                allCourses: [],
                selectedCourseToAdd: "",
            });
        }
    })
); 