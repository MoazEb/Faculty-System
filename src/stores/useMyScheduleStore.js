import { create } from "zustand";
import { getMySchedule } from "../../API/endpoints";
import useAuthStore from "./useAuthStore";

const useMyScheduleStore = create((set, get) => ({
    schedule: null,
    isLoading: false,
    error: null,

    fetchSchedule: async () => {
        set({ isLoading: true, error: null });
        try {
            const { fullId } = useAuthStore.getState();
            if (!fullId) {
                throw new Error("User not found.");
            }

            const scheduleRes = await getMySchedule(fullId);
            set({ schedule: scheduleRes.data, isLoading: false });

        } catch (err) {
            const errorMessage = err.message || "Failed to fetch schedule.";
            set({ error: errorMessage, isLoading: false });
            console.error(err);
        }
    },
}));

export default useMyScheduleStore; 