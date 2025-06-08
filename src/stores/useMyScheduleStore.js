import { create } from "zustand";
import { getMySchedule, getProfile } from "../../API/endpoints";
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

            const profileRes = await getProfile(fullId);
            const level = profileRes.data?.level;

            if (level) {
                const scheduleRes = await getMySchedule(level);
                set({ schedule: scheduleRes.data, isLoading: false });
            } else {
                throw new Error("Could not determine user level.");
            }
        } catch (err) {
            const errorMessage = err.message || "Failed to fetch schedule.";
            set({ error: errorMessage, isLoading: false });
            console.error(err);
        }
    },
}));

export default useMyScheduleStore; 