import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { toast } from "react-hot-toast";
import {
    startConnection,
    stopConnection,
    setupEventListeners,
    removeEventListeners,
    generateTimeTable,
    getTimeTablesList,
    loadTimeTable,
    saveTimeTable,
    deleteTimeTable,
    setActiveTimeTable,
    loadActiveTimeTable,
    undoOperation,
    redoOperation,
    addInterval,
    removeInterval,
    moveInterval,
    mapResultObject,
    findValidPlacesForStaff,
    findValidStaffForPlace,
} from "../../API/signalRConnection";

export const useTimetableStore = create(
    persist(
        (set, get) => ({
            // constants
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            courseTypes: ["Lecture", "Practical"],

            // Connection state
            isConnected: false,
            isLoading: false,
            connectionError: null,

            // TimeTable data
            timeTableData: null,
            timeTablesList: [],
            selectedTimeTable: "",
            activeTimeTable: "",
            fileName: "",

            // Staff and place lists
            staffList: [],
            placesList: [],

            // Search results
            staffSearchResults: null,
            placesSearchResults: null,

            // Delete confirmation
            timetableToDelete: "",
            showDeleteConfirmation: false,
            isDeleting: false,

            // UI states for forms
            showIntervalForm: false,
            showMoveIntervalForm: false,
            intervalToMoveData: null,

            // Exclude Models Modal state
            showExcludeModelsModal: false,

            // Searching State
            isSearching: false,

            // Action to set the deleting state
            setIsDeleting: (deleting) => set({ isDeleting: deleting }),
            // Actions to manage delete confirmation modal state
            setTimetableToDelete: (name) => set({ timetableToDelete: name }),
            setShowDeleteConfirmation: (show) => set({ showDeleteConfirmation: show }),

            // Actions to manage IntervalForm modal state
            setShowIntervalForm: (show) => set({ showIntervalForm: show }),
            openIntervalForm: () => set({ showIntervalForm: true }),
            closeIntervalForm: () => set({ showIntervalForm: false }),

            // Actions to manage MoveIntervalForm modal state
            setShowMoveIntervalForm: (show) => set({ showMoveIntervalForm: show }),
            setIntervalToMoveData: (data) => set({ intervalToMoveData: data }),
            openMoveIntervalForm: (data) => set({ intervalToMoveData: data, showMoveIntervalForm: true }),
            closeMoveIntervalForm: () => set({ showMoveIntervalForm: false, intervalToMoveData: null }),

            // Actions to manage ExcludeModelsModal state
            openExcludeModelsModal: () => set({ showExcludeModelsModal: true }),
            closeExcludeModelsModal: () => set({ showExcludeModelsModal: false }),

            // Connect to SignalR hub
            connect: async () => {
                set({ isLoading: true, connectionError: null });
                try {
                    const connected = await startConnection();
                    set({ isConnected: connected });

                    if (connected) {
                        setupEventListeners({
                            onTimeTableGenerated: (result) => get().handleTimeTableResult(result),
                            onTimeTablesListReceived: (names) => set({ timeTablesList: names }),
                            onTimeTableLoaded: (result) => get().handleTimeTableResult(result),
                            onActiveTimeTableLoaded: (result) => get().handleTimeTableResult(result),
                            onTimeTableDeleted: (result) => get().handleOperationResult(result),
                            onActiveTimeTableSet: (result) => get().handleOperationResult(result),
                            onUndoResult: (result) => get().handleTimeTableResult(result),
                            onRedoResult: (result) => get().handleTimeTableResult(result),
                            onIntervalAdded: (result) => get().handleTimeTableResult(result),
                            onIntervalRemoved: (result) => get().handleTimeTableResult(result),
                            onIntervalMoved: (result) => get().handleTimeTableResult(result),
                            onValidStaffFound: (result) => get().handleStaffSearchResult(result),
                            onValidPlacesFound: (result) => get().handlePlacesSearchResult(result),
                        });

                        // Load initial data
                        await get().getTimeTablesList();

                        // Try to load active timetable if available
                        // try {
                        //     await get().loadActiveTimeTable();
                        // } catch (error) {
                        //     console.error("Failed to load active timetable, will try first available", error);

                        //     // If no active timetable, try to load the first one in the list
                        //     const { timeTablesList } = get();
                        //     if (timeTablesList && timeTablesList.length > 0) {
                        //         await get().loadTimeTable(timeTablesList[0]);
                        //     }
                        // }
                    } else {
                        set({ connectionError: "Failed to connect to the server" });
                    }
                } catch (error) {
                    console.error("Connection error:", error);
                    set({ connectionError: error.message || "Failed to connect to the server" });
                } finally {
                    set({ isLoading: false });
                }
            },

            // Disconnect from SignalR hub
            disconnect: async () => {
                removeEventListeners();
                await stopConnection();
                set({ isConnected: false });
            },

            // Handle timetable result
            handleTimeTableResult: (result) => {
                const mappedResult = mapResultObject(result);
                if (mappedResult.success) {
                    set({
                        timeTableData: mappedResult.data,
                        staffList: mappedResult.data?.teachingStaffName || [],
                        placesList: mappedResult.data?.teachingPlacesName || [],
                        fileName: mappedResult.data?.name || ""
                    });
                    toast.success("Operation completed successfully");
                } else {
                    toast.error(mappedResult.error || "Operation failed");
                }
            },

            // Handle operation result
            handleOperationResult: (result) => {
                const mappedResult = mapResultObject(result);
                if (mappedResult.success) {
                    toast.success("Operation completed successfully");
                } else {
                    toast.error(mappedResult.error || "Operation failed");
                }
            },

            // Handle staff search result
            handleStaffSearchResult: (result) => {
                console.log("Processing staff search result:", result);
                const mappedResult = mapResultObject(result);
                console.log("Mapped staff result:", mappedResult);
                if (mappedResult.success) {
                    set({ staffSearchResults: mappedResult.data });
                    toast.success("Staff search completed");
                } else {
                    set({ staffSearchResults: null });
                    toast.error(mappedResult.error || "Staff search failed");
                }
            },

            // Handle places search result
            handlePlacesSearchResult: (result) => {
                console.log("Processing places search result:", result);
                const mappedResult = mapResultObject(result);
                console.log("Mapped places result:", mappedResult);
                if (mappedResult.success) {
                    set({ placesSearchResults: mappedResult.data });
                    toast.success("Places search completed");
                } else {
                    set({ placesSearchResults: null });
                    toast.error(mappedResult.error || "Places search failed");
                }
            },

            // Set selected timetable
            setSelectedTimeTable: (name) => set({ selectedTimeTable: name }),

            // Set filename
            setFileName: (name) => set({ fileName: name }),

            // TimeTable operations
            generateTimeTable: async (excludeModel = null, departmentId = 1) => {
                set({ isLoading: true });
                try {
                    const model = excludeModel && Object.values(excludeModel).some(arr => arr.length > 0)
                        ? excludeModel
                        : null;
                    await generateTimeTable(model, departmentId);
                } catch (error) {
                    console.error("Error generating timetable:", error); // Added console error
                    toast.error("Failed to generate timetable");
                } finally {
                    set({ isLoading: false });
                }
            },

            getTimeTablesList: async () => {
                try {
                    await getTimeTablesList();
                } catch (error) {
                    toast.error("Failed to load timetables list");
                }
            },

            loadTimeTable: async (name) => {
                if (!name) {
                    toast.error("Please select a timetable");
                    return;
                }
                set({ isLoading: true });
                try {
                    await loadTimeTable(name);
                    set({ selectedTimeTable: name });
                } catch (error) {
                    toast.error("Failed to load timetable");
                } finally {
                    set({ isLoading: false });
                }
            },

            saveTimeTable: async (name) => {
                if (!name.trim()) {
                    toast.error("Please enter a file name");
                    return;
                }
                try {
                    await saveTimeTable(name.trim());
                    toast.success("Timetable saved successfully");
                    await get().getTimeTablesList();
                } catch (error) {
                    toast.error("Failed to save timetable");
                }
            },

            deleteTimeTable: async (name) => {
                if (!name) {
                    toast.error("Please select a timetable to delete");
                    return;
                }
                try {
                    await deleteTimeTable(name);
                    set({ selectedTimeTable: "" });
                    await get().getTimeTablesList();
                } catch (error) {
                    toast.error("Failed to delete timetable");
                }
            },

            setActiveTimeTable: async (name) => {
                if (!name) {
                    toast.error("Please select a timetable");
                    return;
                }
                try {
                    await setActiveTimeTable(name);
                    set({ activeTimeTable: name });
                } catch (error) {
                    toast.error("Failed to set active timetable");
                }
            },

            loadActiveTimeTable: async () => {
                set({ isLoading: true });
                try {
                    await loadActiveTimeTable();
                } catch (error) {
                    toast.error("Failed to load active timetable");
                    throw error; // Rethrow to allow fallback handling
                } finally {
                    set({ isLoading: false });
                }
            },

            // Undo/Redo operations
            undoOperation: async () => {
                try {
                    await undoOperation();
                } catch (error) {
                    toast.error("Failed to undo operation");
                }
            },

            redoOperation: async () => {
                try {
                    await redoOperation();
                } catch (error) {
                    toast.error("Failed to redo operation");
                }
            },

            // Interval operations
            addInterval: async (intervalData) => {
                try {
                    console.log("intervalData", intervalData)
                    await addInterval(intervalData);
                    return true;
                } catch (error) {
                    toast.error("Failed to add interval");
                    return false;
                }
            },

            removeInterval: async (intervalData) => {
                try {
                    await removeInterval(intervalData);
                    return true;
                } catch (error) {
                    toast.error("Failed to remove interval");
                    return false;
                }
            },

            moveInterval: async (intervalData, newDay, requiredInterval) => {
                try {
                    await moveInterval(intervalData, newDay, requiredInterval);
                    return true;
                } catch (error) {
                    toast.error("Failed to move interval");
                    return false;
                }
            },

            // Search operations
            findValidPlacesForStaff: async (staffUsername, requiredHours) => {
                if (!staffUsername || !requiredHours) {
                    toast.error("Please provide staff username and required hours.");
                    return;
                }
                set({ isSearching: true });
                try {
                    await findValidPlacesForStaff(staffUsername, parseInt(requiredHours));
                } catch (error) {
                    toast.error("Failed to find valid places for staff");
                } finally {
                    set({ isSearching: false });
                }
            },

            findValidStaffForPlace: async (placeName, requiredHours) => {
                if (!placeName || !requiredHours) {
                    toast.error("Please provide place name and required hours.");
                    return;
                }
                set({ isSearching: true });
                try {
                    await findValidStaffForPlace(placeName, parseInt(requiredHours));
                } catch (error) {
                    toast.error("Failed to find valid staff for place");
                } finally {
                    set({ isSearching: false });
                }
            }
        }),
        {
            name: 'timetable-storage',
            partialize: (state) => ({
                // Only persist these states
                selectedTimeTable: state.selectedTimeTable,
                activeTimeTable: state.activeTimeTable,
                fileName: state.fileName
            })
        }
    )
);