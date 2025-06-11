import React from "react";
import { toast } from "react-hot-toast";
import { UploadIcon, CheckSquareIcon, TrashIcon, FloppyDiskIcon, PlayIcon, Star } from "@phosphor-icons/react";
import { useTimetableStore } from "../../stores/useTimetableStore";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ExcludeModelsModal from './ExcludeModelsModal';


const TimeTableHeader = () => {
    const {
        isConnected,
        isLoading,
        timeTableData,
        timeTablesList,
        selectedTimeTable,
        setSelectedTimeTable,
        fileName,
        setFileName,
        loadTimeTable,
        saveTimeTable,
        setActiveTimeTable,
        setTimetableToDelete,
        setShowDeleteConfirmation,
        deleteTimeTable,
        timetableToDelete,
        showDeleteConfirmation,
        isDeleting,
        setIsDeleting,
        generateTimeTable,
        openExcludeModelsModal,
        showExcludeModelsModal,
        closeExcludeModelsModal,
        loadActiveTimeTable
    } = useTimetableStore();

    const handleLoad = async () => {
        if (selectedTimeTable) {
            await loadTimeTable(selectedTimeTable);
        } else {
            toast.error("Please select a timetable to load.");
        }
    };

    const handleLoadActive = async () => {
        await loadActiveTimeTable();
    };

    const handleSave = async () => {
        if (fileName.trim()) {
            await saveTimeTable(fileName.trim());
        } else {
            toast.error("Please enter a name for the timetable.");
        }
    };

    const handleSetActive = async () => {
        if (selectedTimeTable) {
            await setActiveTimeTable(selectedTimeTable);
        } else {
            toast.error("Please select a timetable to set as active.");
        }
    };

    const handleDelete = (name) => {
        setTimetableToDelete(name);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        if (timetableToDelete) {
            await deleteTimeTable(timetableToDelete);
            if (selectedTimeTable === timetableToDelete) {
                setSelectedTimeTable("");
            }
        }
        setShowDeleteConfirmation(false);
        setTimetableToDelete("");
        setIsDeleting(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setTimetableToDelete("");
    };

    const handleGenerateWithExclusions = async (excludeModel) => {
        await generateTimeTable(excludeModel);
    };

    const handleOpenExclusionModal = () => {
        openExcludeModelsModal();
    };
    return (
        <header className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-light text-gray-700 dark:text-primary-light text-center md:text-left">
                    Timetable Management
                </h1>
                {/* Connection Status */}
                <div
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                        isConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                >
                    <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
                    {isConnected ? "Connected" : "Disconnected"}
                </div>
            </div>

            {/* File Operations Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow dark:bg-secondary-dark">
                {/* Load/Delete/Set Active */}
                <div className="space-y-4">
                    <h2 className="text-lg text-gray-700 dark:text-primary-light">Manage Saved Timetables</h2>
                    <div className="flex items-end gap-2">
                        <div className="flex-grow">
                            <label
                                htmlFor="load-timetable"
                                className="block text-sm font-medium text-gray-600 mb-1 dark:text-primary-light"
                            >
                                Select Timetable:
                            </label>
                            <select
                                id="load-timetable"
                                value={selectedTimeTable}
                                onChange={(e) => setSelectedTimeTable(e.target.value)}
                                disabled={isLoading || !isConnected || timeTablesList.length === 0}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary disabled:bg-gray-50 dark:bg-secondary-dark disabled:dark:bg-secondary-dark dark:text-primary-light dark:border-gray-600"
                            >
                                <option value="">
                                    {timeTablesList.length === 0 ? "No timetables available" : "Select..."}
                                </option>
                                {timeTablesList.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleOpenExclusionModal()}
                            // onClick={() => generateTimeTable()}
                            disabled={isLoading || !isConnected}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 transition-colors cursor-pointer"
                        >
                            <PlayIcon /> New
                        </button>
                        <button
                            onClick={handleLoad}
                            disabled={isLoading || !isConnected || !selectedTimeTable}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-secondary disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:dark:text-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                            <UploadIcon /> Load
                        </button>
                        <button
                            onClick={() => handleDelete(selectedTimeTable)}
                            disabled={isLoading || !isConnected || !selectedTimeTable}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-700 text-white rounded-md hover:bg-red-800 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:dark:text-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed "
                        >
                            <TrashIcon /> Delete
                        </button>
                        <button
                            onClick={handleSetActive}
                            disabled={isLoading || !isConnected || !selectedTimeTable}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:dark:text-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                            <CheckSquareIcon /> Set Active
                        </button>
                        <button
                            onClick={handleLoadActive}
                            disabled={isLoading || !isConnected}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:dark:text-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                            <Star /> Load Active
                        </button>
                    </div>
                </div>

                {/* Save As */}
                <div className="space-y-4">
                    <h2 className="text-lg text-gray-700 dark:text-primary-light">Save Current Timetable</h2>
                    <div className="flex items-end gap-2">
                        <div className="flex-grow">
                            <label
                                htmlFor="save-timetable-name"
                                className="block text-sm font-medium text-gray-600 mb-1 dark:text-primary-light"
                            >
                                Timetable Name:
                            </label>
                            <input
                                type="text"
                                id="save-timetable-name"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                placeholder="Enter timetable name"
                                disabled={isLoading || !isConnected || !timeTableData}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary disabled:bg-gray-50 dark:bg-secondary-dark disabled:dark:bg-secondary-dark dark:text-primary-light dark:border-gray-600 dark:placeholder-gray-400 disabled:cursor-not-allowed"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isLoading || !isConnected || !timeTableData || !fileName.trim()}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-secondary disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:dark:text-gray-400 transition-colors self-end cursor-pointer disabled:cursor-not-allowed"
                        >
                            <FloppyDiskIcon /> Save As
                        </button>
                    </div>
                    {timeTableData && (
                        <p className="text-xs text-gray-500 dark:text-primary-light">
                            Current timetable in view:{" "}
                            <span className="font-medium">{timeTableData.name || "Untitled"}</span>
                        </p>
                    )}
                </div>
            </div>

            <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                itemName={timetableToDelete}
                isDeleting={isDeleting}
            />
            {showExcludeModelsModal && (
                <ExcludeModelsModal
                    show={showExcludeModelsModal}
                    onClose={closeExcludeModelsModal}
                    onConfirm={handleGenerateWithExclusions}
                />
            )}
        </header>
    );
};

export default TimeTableHeader;
