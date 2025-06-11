import React from 'react';
import { PlusIcon, ArrowCounterClockwiseIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
import { useTimetableStore } from "../../stores/useTimetableStore";
    
export default function TimetableActions() {
    const {
        openIntervalForm,
        undoOperation,
        redoOperation,
        isConnected,
        isLoading,
        timeTableData,
    } = useTimetableStore();

    return (
        <div className="flex flex-wrap gap-2 font-light text-sm">
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
        </div>
    );
} 