import { create } from "zustand";
import { getTeachingPlaces as fetchTeachingPlacesApi, addTeachingPlace as addTeachingPlaceApi, updateTeachingPlace as updateTeachingPlaceApi, deleteTeachingPlace as deleteTeachingPlaceApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useTeachingPlacesStore = create((set, get) => ({
    teachingPlaces: [],
    isLoading: false,
    isThereNextPage: false,
    filters: { type: "", name: "", page: 0 }, // Default filters

    setTeachingPlaces: (teachingPlaces) => set({ teachingPlaces }),

    getTeachingPlaces: async () => {
        const { filters } = get();
        try {
            set({ isLoading: true });
            const params = {
                page: filters.page || 0,
                type: filters.type || "",
                name: filters.name || "",
            };
            const response = await fetchTeachingPlacesApi(params);
            set({ teachingPlaces: response.data.results, isThereNextPage: response.data.isThereNextPage });
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error fetching teaching places");
            console.error("Error fetching teaching places:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    setFilters: (newFilters) => {
        const oldFilters = get().filters;
        const updatedFilters = { ...oldFilters, ...newFilters, page: 0 };

        if (JSON.stringify(oldFilters) !== JSON.stringify(updatedFilters)) {
            set({ filters: updatedFilters });
            get().getTeachingPlaces();
        }
    },

    goToPage: (page) => {
        const { filters } = get();
        const oldFilters = get().filters;
        const updatedFilters = { ...filters, page };

        if (JSON.stringify(oldFilters) !== JSON.stringify(updatedFilters)) {
            set({ filters: updatedFilters });
            get().getTeachingPlaces();
        }
    },

    addTeachingPlace: async (newPlaceData) => {
        try {
            set({ isLoading: true });
            await addTeachingPlaceApi(newPlaceData);
            await get().getTeachingPlaces();
            toast.success("Teaching place added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error adding teaching place");
            console.error("Error adding teaching place:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateTeachingPlace: async (placeId, updatedData) => {
        try {
            set({ isLoading: true });
            await updateTeachingPlaceApi(placeId, updatedData);
            await get().getTeachingPlaces();
            toast.success("Teaching place updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error updating teaching place");
            console.error("Error updating teaching place:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteTeachingPlace: async (placeId) => {
        try {
            set({ isLoading: true });
            await deleteTeachingPlaceApi(placeId);
            await get().getTeachingPlaces();
            toast.success("Teaching place deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error deleting teaching place");
            console.error("Error deleting teaching place:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    getPlaceTypeLabel: (type) => {
        return type === 0 ? "Hall" : type === 1 ? "Lab" : "Unknown";
    }
}));