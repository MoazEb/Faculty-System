import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create and configure the SignalR connection
const createHubConnection = () => {
    const connection = new HubConnectionBuilder()
        .withUrl(`${API_URL}/TimeTableHub`, {
            accessTokenFactory: () => Cookies.get('access_token'),
            headers: {
                'x-api-key': API_KEY,
            },
            transport: HttpTransportType.LongPolling,
            skipNegotiation: false,
        })
        .withAutomaticReconnect([0, 2000, 10000, 15000])
        .configureLogging(LogLevel.Information)
        .build();

    // Add connection event handlers
    connection.onclose(error => {
        console.log('SignalR connection closed', error);
    });

    connection.onreconnecting(error => {
        console.log('SignalR reconnecting', error);
    });

    connection.onreconnected(connectionId => {
        console.log('SignalR reconnected', connectionId);
    });

    return connection;
};

// TimeTable hub specific connection
const timeTableHubConnection = createHubConnection();
let connectionPromise = null;

// Start the connection
const startConnection = async () => {
    try {
        // Check if connection is already in progress
        if (connectionPromise) {
            return await connectionPromise;
        }

        // Check if connection is already established
        if (timeTableHubConnection.state === 'Connected') {
            console.log('SignalR connection already established');
            return true;
        }

        // Check if connection is not in Disconnected state
        if (timeTableHubConnection.state !== 'Disconnected') {
            console.log(`Connection is in ${timeTableHubConnection.state} state. Cannot start.`);
            return false;
        }

        // Start a new connection and store the promise
        connectionPromise = timeTableHubConnection.start();
        await connectionPromise;
        console.log('SignalR connection established successfully');
        return true;
    } catch (error) {
        console.error('Failed to establish SignalR connection:', error);
        return false;
    } finally {
        connectionPromise = null;
    }
};

// Stop the connection
const stopConnection = async () => {
    try {
        if (timeTableHubConnection.state === 'Connected') {
            await timeTableHubConnection.stop();
            console.log('SignalR connection stopped');
        } else {
            console.log(`Connection is in ${timeTableHubConnection.state} state. No need to stop.`);
        }
    } catch (error) {
        console.error('Failed to stop SignalR connection:', error);
    }
};

// ================== CLIENT TO SERVER METHODS ==================

// 1. Generate TimeTable
const generateTimeTable = async (excludeModel = null, departmentId = 1) => {
    try {
        // console.log("--------------------------------");
        // console.log("excludeModel", excludeModel);
        const defaultExcludeModel = {
            PlacesId: [],
            CoursesId: [],
            StaffUserName: []
        };
        await timeTableHubConnection.invoke("generateTimeTableContext", excludeModel || defaultExcludeModel, departmentId);
    } catch (error) {
        console.error('Failed to generate timetable:', error);
        throw error;
    }
};

// 2. Get TimeTables List
const getTimeTablesList = async () => {
    try {
        await timeTableHubConnection.invoke("getTimeTablesContext");
    } catch (error) {
        console.error('Failed to get timetables list:', error);
        throw error;
    }
};

// 3. Load Specific TimeTable
const loadTimeTable = async (timeTableName) => {
    try {
        await timeTableHubConnection.invoke("loadTimeTableContext", timeTableName);
        // console.log("timetable loaded", response);
    } catch (error) {
        console.error('Failed to load timetable:', error);
        throw error;
    }
};

// 4. Save Current TimeTable
const saveTimeTable = async (fileName) => {
    try {
        await timeTableHubConnection.invoke("saveCurrentTimeTableContext", fileName);
    } catch (error) {
        console.error('Failed to save timetable:', error);
        throw error;
    }
};

// 5. Delete TimeTable
const deleteTimeTable = async (timeTableName) => {
    try {
        await timeTableHubConnection.invoke("deleteTimeTableContext", timeTableName);
    } catch (error) {
        console.error('Failed to delete timetable:', error);
        throw error;
    }
};

// 6. Set Active TimeTable
const setActiveTimeTable = async (timeTableName) => {
    try {
        await timeTableHubConnection.invoke("setActiveTimeTableContext", timeTableName);
    } catch (error) {
        console.error('Failed to set active timetable:', error);
        throw error;
    }
};

// 7. Load Active TimeTable
const loadActiveTimeTable = async () => {
    try {
        await timeTableHubConnection.invoke("loadActiveTimeTableContext");
    } catch (error) {
        console.error('Failed to load active timetable:', error);
        throw error;
    }
};

// 8. Undo Operation
const undoOperation = async () => {
    try {
        await timeTableHubConnection.invoke("undo");
    } catch (error) {
        console.error('Failed to undo operation:', error);
        throw error;
    }
};

// 9. Redo Operation
const redoOperation = async () => {
    try {
        await timeTableHubConnection.invoke("redo");
    } catch (error) {
        console.error('Failed to redo operation:', error);
        throw error;
    }
};

// 10. Find Valid Places for Staff
const findValidPlacesForStaff = async (staffUsername, requiredHours) => {
    try {
        await timeTableHubConnection.invoke("findValidPlaces", staffUsername, requiredHours);
    } catch (error) {
        console.error('Failed to find valid places for staff:', error);
        throw error;
    }
};

// 11. Find Valid Staff for Place
const findValidStaffForPlace = async (placeName, requiredHours) => {
    try {
        await timeTableHubConnection.invoke("findValidStaff", placeName, requiredHours);
    } catch (error) {
        console.error('Failed to find valid staff for place:', error);
        throw error;
    }
};

// 12. Add Interval
const addInterval = async (intervalModel) => {
    try {
        await timeTableHubConnection.invoke("addInterval", intervalModel);
    } catch (error) {
        console.error('Failed to add interval:', error);
        throw error;
    }
};

// 13. Remove Interval
const removeInterval = async (intervalModel) => {
    try {
        await timeTableHubConnection.invoke("removeInterval", intervalModel);
    } catch (error) {
        console.error('Failed to remove interval:', error);
        throw error;
    }
};

// 14. Move Interval
const moveInterval = async (intervalModel, newDay, requiredInterval) => {
    try {
        await timeTableHubConnection.invoke("moveInterval", intervalModel, newDay, requiredInterval);
    } catch (error) {
        console.error('Failed to move interval:', error);
        throw error;
    }
};

// ================== EVENT LISTENERS SETUP ==================

// Setup all server to client event listeners
const setupEventListeners = (callbacks = {}) => {
    removeEventListeners();
    // TimeTable Generation Result
    timeTableHubConnection.on("generateTimeTableContextResult", (result) => {
        console.log("TimeTable generated:", result);
        if (callbacks.onTimeTableGenerated) {
            callbacks.onTimeTableGenerated(result);
        }
    });

    // TimeTables List Result
    timeTableHubConnection.on("getTimeTablesContextResult", (timeTableNames) => {
        console.log("Available timetables:", timeTableNames);
        if (callbacks.onTimeTablesListReceived) {
            callbacks.onTimeTablesListReceived(timeTableNames);
        }
    });

    // Load TimeTable Result
    timeTableHubConnection.on("loadTimeTableContextResult", (result) => {
        console.log("TimeTable loaded:", result);
        if (callbacks.onTimeTableLoaded) {
            callbacks.onTimeTableLoaded(result);
        }
    });

    // Delete TimeTable Result
    timeTableHubConnection.on("deleteTimeTableContextResult", (result) => {
        console.log("Delete timetable result:", result);
        if (callbacks.onTimeTableDeleted) {
            callbacks.onTimeTableDeleted(result);
        }
    });

    // Set Active TimeTable Result
    timeTableHubConnection.on("setActiveTimeTableContextResult", (result) => {
        console.log("Set active timetable result:", result);
        if (callbacks.onActiveTimeTableSet) {
            callbacks.onActiveTimeTableSet(result);
        }
    });

    // Load Active TimeTable Result
    timeTableHubConnection.on("loadActiveTimeTableContextResult", (result) => {
        console.log("Load active timetable result:", result);
        if (callbacks.onActiveTimeTableLoaded) {
            callbacks.onActiveTimeTableLoaded(result);
        }
    });

    // Undo Result
    timeTableHubConnection.on("undoResult", (result) => {
        console.log("Undo result:", result);
        if (callbacks.onUndoResult) {
            callbacks.onUndoResult(result);
        }
    });

    // Redo Result
    timeTableHubConnection.on("redoResult", (result) => {
        console.log("Redo result:", result);
        if (callbacks.onRedoResult) {
            callbacks.onRedoResult(result);
        }
    });

    // Search Results - Valid Staff
    timeTableHubConnection.on("findValidStaffResult", (result) => {
        console.log("Raw valid staff result:", result);
        if (callbacks.onValidStaffFound) {
            callbacks.onValidStaffFound(result);
        }
    });

    // Search Results - Valid Places
    timeTableHubConnection.on("findValidPlacesResult", (result) => {
        console.log("Raw valid places result:", result);
        if (callbacks.onValidPlacesFound) {
            callbacks.onValidPlacesFound(result);
        }
    });

    // Add Interval Result
    timeTableHubConnection.on("addIntervalResult", (result) => {
        console.log("Add interval result:", result);
        if (callbacks.onIntervalAdded) {
            callbacks.onIntervalAdded(result);
        }
    });

    // Remove Interval Result
    timeTableHubConnection.on("removeIntervalResult", (result) => {
        console.log("Remove interval result:", result);
        if (callbacks.onIntervalRemoved) {
            callbacks.onIntervalRemoved(result);
        }
    });

    // Move Interval Result
    timeTableHubConnection.on("moveIntervalResult", (result) => {
        console.log("Move interval result:", result);
        if (callbacks.onIntervalMoved) {
            callbacks.onIntervalMoved(result);
        }
    });
};

// Remove all event listeners
const removeEventListeners = () => {
    timeTableHubConnection.off("generateTimeTableContextResult");
    timeTableHubConnection.off("getTimeTablesContextResult");
    timeTableHubConnection.off("loadTimeTableContextResult");
    timeTableHubConnection.off("deleteTimeTableContextResult");
    timeTableHubConnection.off("setActiveTimeTableContextResult");
    timeTableHubConnection.off("loadActiveTimeTableContextResult");
    timeTableHubConnection.off("undoResult");
    timeTableHubConnection.off("redoResult");
    timeTableHubConnection.off("findValidStaffResult");
    timeTableHubConnection.off("findValidPlacesResult");
    timeTableHubConnection.off("addIntervalResult");
    timeTableHubConnection.off("removeIntervalResult");
    timeTableHubConnection.off("moveIntervalResult");
};

// ================== HELPER FUNCTIONS ==================

// Helper function to map result object
const mapResultObject = (result) => {
    if (!result) return { success: false, error: "No result received", data: null };

    // Handle different result structures that might come from the server
    if (result.data !== undefined) {
        // Standard result object with data property
        return {
            success: result.isSuccess || false,
            error: result.errorMessage || null,
            exception: result.exception || null,
            data: result.data
        };
    } else if (typeof result === 'object' && !result.isSuccess && !result.errorMessage) {
        // The result itself might be the data (especially for search results)
        return {
            success: true,
            error: null,
            exception: null,
            data: result
        };
    } else {
        // Default structure
        return {
            success: result.isSuccess || false,
            error: result.errorMessage || null,
            exception: result.exception || null,
            data: null
        };
    }
};

// ================== EXPORTS ==================

export {
    // Connection management
    timeTableHubConnection,
    startConnection,
    stopConnection,

    // Event listeners
    setupEventListeners,
    removeEventListeners,

    // TimeTable operations
    generateTimeTable,
    getTimeTablesList,
    loadTimeTable,
    saveTimeTable,
    deleteTimeTable,
    setActiveTimeTable,
    loadActiveTimeTable,

    // Undo/Redo operations
    undoOperation,
    redoOperation,

    // Search operations
    findValidPlacesForStaff,
    findValidStaffForPlace,

    // Interval operations
    addInterval,
    removeInterval,
    moveInterval,

    // Helper functions
    mapResultObject
};
