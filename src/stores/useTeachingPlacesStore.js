import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { getTeachingPlaces as fetchTeachingPlacesApi, addTeachingPlace as addTeachingPlaceApi, updateTeachingPlace as updateTeachingPlaceApi, deleteTeachingPlace as deleteTeachingPlaceApi } from "../../API/endpoints";
import toast from "react-hot-toast";

export const useTeachingPlacesStore = create(
    persist(
        (set, get) => ({
            teachingPlaces: [],
            isLoading: false,
            setTeachingPlaces: (teachingPlaces) => set({ teachingPlaces }),
            getTeachingPlaces: async () => {
                try {
                    set({ isLoading: true });
                    const response = await fetchTeachingPlacesApi();
                    set({ teachingPlaces: response.data.results });
                } catch (error) {
                    toast.error(error.response?.data?.detail || "Error fetching teaching places");
                    console.error("Error fetching teaching places:", error);
                } finally {
                    set({ isLoading: false });
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
            // Helper function to get place type label based on type value
            getPlaceTypeLabel: (type) => {
                return type === 0 ? "Hall" : type === 1 ? "Lab" : "Unknown";
            }
        }),
        {
            name: 'teaching-places-storage',
        }
    )
);