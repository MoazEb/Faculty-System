import { create } from "zustand";
import {
    getTeachingPlaceSchedules,
    addTeachingPlaceSchedules,
    getTeachingStaffSchedules,
    addTeachingStaffSchedules,
    updateSchedule as apiUpdateSchedule,
    deleteSchedules as apiDeleteSchedules
} from "../../API/endpoints";
import toast from "react-hot-toast";

export const useSchedulesStore = create((set, get) => ({
    placeSchedules: [],
    staffSchedules: [],
    isLoading: false,

    // Teaching Place Schedules
    getPlaceSchedules: async (placeId) => {
        try {
            set({ isLoading: true });
            const response = await getTeachingPlaceSchedules(placeId);
            set({ placeSchedules: response.data });
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error fetching place schedules");
            console.error("Error fetching place schedules:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    addPlaceSchedules: async (placeId, schedules) => {
        try {
            set({ isLoading: true });
            await addTeachingPlaceSchedules(placeId, schedules);
            await get().getPlaceSchedules(placeId);
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error adding schedules");
            console.error("Error adding schedules:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deletePlaceSchedules: async (placeId, scheduleIdsList) => {
        try {
            set({ isLoading: true });
            console.log("placeId", placeId);
            console.log("scheduleIdsList", scheduleIdsList);

            await apiDeleteSchedules(scheduleIdsList);
            set((state) => ({
                placeSchedules: state.placeSchedules.filter(
                    (schedule) => !scheduleIdsList.includes(schedule.id)
                ),
            }));
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error deleting schedules");
            console.error("Error deleting schedules:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateSchedule: async (entityId, schedule, scheduleType) => {
        try {
            set({ isLoading: true });
            const { id, ...scheduleData } = schedule;
            await apiUpdateSchedule(id, scheduleData);

            if (scheduleType === 'place') {
                await get().getPlaceSchedules(entityId);
            } else {
                await get().getStaffSchedules(entityId);
            }
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error updating schedule");
            console.error("Error updating schedule:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    // Teaching Staff Schedules
    getStaffSchedules: async (username) => {
        try {
            set({ isLoading: true });
            const response = await getTeachingStaffSchedules(username);
            set({ staffSchedules: response.data });
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error fetching staff schedules");
            console.error("Error fetching staff schedules:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    addStaffSchedules: async (username, schedules) => {
        try {
            set({ isLoading: true });
            await addTeachingStaffSchedules(username, schedules);
            await get().getStaffSchedules(username);
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error adding schedules");
            console.error("Error adding schedules:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteStaffSchedules: async (username, scheduleIdsList) => {
        try {
            set({ isLoading: true });
            await apiDeleteSchedules(scheduleIdsList);
            set((state) => ({
                staffSchedules: state.staffSchedules.filter(
                    (schedule) => !scheduleIdsList.includes(schedule.id)
                ),
            }));
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error deleting schedules");
            console.error("Error deleting schedules:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
})); 