import React from 'react';
import { PlayIcon, PlusIcon, ArrowCounterClockwiseIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
import { useTimetableStore } from "../../stores/useTimetableStore";
import ExcludeModelsModal from './ExcludeModelsModal';

export default function TimetableActions() {
    const {
        generateTimeTable,
        openIntervalForm,
        undoOperation,
        redoOperation,
        isConnected,
        isLoading,
        timeTableData,
        openExcludeModelsModal,
        showExcludeModelsModal,
        closeExcludeModelsModal
    } = useTimetableStore();

    const handleGenerateWithExclusions = async (excludeModel) => {
        await generateTimeTable(excludeModel);
    };

    const handleOpenExclusionModal = () => {
        openExcludeModelsModal();
    };

    return (
        <div className="flex flex-wrap gap-2 font-light text-sm">
            <button
                // onClick={handleOpenExclusionModal}
                onClick={() => generateTimeTable()}
                disabled={isLoading || !isConnected}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 transition-colors cursor-pointer"
            >
                <PlayIcon /> Generate New
            </button>
            <button
                onClick={openIntervalForm}
                disabled={isLoading || !isConnected || !timeTableData}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary disabled:bg-gray-300 transition-colors cursor-pointer"
            >
                <PlusIcon /> Add Interval
            </button>
            <button
                onClick={undoOperation}
                disabled={isLoading || !isConnected || !timeTableData}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary disabled:bg-gray-300 transition-colors cursor-pointer"
            >
                <ArrowCounterClockwiseIcon /> Undo
            </button>
            <button
                onClick={redoOperation}
                disabled={isLoading || !isConnected || !timeTableData}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary disabled:bg-gray-300 transition-colors cursor-pointer"
            >
                <ArrowClockwiseIcon /> Redo
            </button>

            {/* {showExcludeModelsModal && (
                <ExcludeModelsModal
                    show={showExcludeModelsModal}
                    onClose={closeExcludeModelsModal}
                    onConfirm={handleGenerateWithExclusions}
                />
            )} */}
        </div>
    );
} 