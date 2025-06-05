import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTimetableStore } from "../../stores/useTimetableStore";
import { XIcon, ShuffleIcon, CaretDownIcon } from "@phosphor-icons/react";
import Modal from "react-modal";

const hours = Array.from({ length: 10 }, (_, i) => i + 8);

const MoveIntervalForm = ({
    show,
    onClose,
    intervalToMove,
}) => {
    const { moveInterval, dayNames } = useTimetableStore();
    const [newDay, setNewDay] = useState(0); 
    const [newStartFrom, setNewStartFrom] = useState(8); 

    useEffect(() => {
        if (show && intervalToMove) {
            // Initialize form with current day/time or defaults
            const currentDayIndex = dayNames.indexOf(intervalToMove.day);
            setNewDay(currentDayIndex !== -1 ? currentDayIndex : 0);
            setNewStartFrom(intervalToMove.interval.startFrom || 8);
        }
    }, [show, intervalToMove, dayNames]);

    if (!show || !intervalToMove) return null;

    const { interval, day: originalDayName } = intervalToMove;
    const courseInfo = interval.info;

    const handleSubmitMove = async () => {
        if (!interval || newDay === undefined || newStartFrom === undefined) {
            toast.error("Invalid data for moving interval.");
            return;
        }

        let originalLevel;
        if (courseInfo && courseInfo.courseLevel !== undefined) {
            originalLevel = courseInfo.courseLevel;
        } else {
            toast.error("Could not determine the original level of the course. Move cancelled.");
            return;
        }
        
        const originalDayIndex = dayNames.indexOf(originalDayName);
        if (originalDayIndex === -1) {
            toast.error("Invalid original day. Move cancelled.");
            return;
        }


        const intervalDataForMove = {
            level: originalLevel,
            day: originalDayIndex, 
            interval: {
                startFrom: interval.startFrom,
                endTo: interval.endTo,
                info: { ...courseInfo },
            },
        };
        
        // Calculate duration and newEndTo based on the original interval's duration
        const duration = interval.endTo - interval.startFrom;
        const newEndTo = newStartFrom + duration;

        const requiredIntervalForMove = {
            startFrom: newStartFrom,
            endTo: newEndTo,
        };
        
        await moveInterval(intervalDataForMove, newDay, requiredIntervalForMove);

        onClose();

    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            contentLabel="Move Course Interval Modal"
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-primary dark:text-primary-light">Move Course Interval</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400 cursor-pointer">
                        <XIcon size={20} />
                    </button>
                </div>

                <div className="mb-4 p-3 bg-gray-50 dark:bg-secondary-dark rounded-md border border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                        Moving Course: <strong className="text-primary dark:text-primary-light">{courseInfo.courseCode}</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                        Type: {courseInfo.courseType === 0 ? "Lecture" : "Practical"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                        Original Slot: {originalDayName}, {interval.startFrom}:00 - {interval.endTo}:00
                    </p>
                     <p className="text-xs text-gray-500 dark:text-gray-300">
                        Teacher: {courseInfo.teachingAssistant}
                    </p>
                     <p className="text-xs text-gray-500 dark:text-gray-300">
                        Place: {courseInfo.teachingPlace}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="newDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Day:
                        </label>
                        <div className="relative w-full">
                            <select
                                id="newDay"
                                value={newDay}
                                onChange={(e) => setNewDay(parseInt(e.target.value))}
                                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                            >
                                {dayNames.map((day, index) => (
                                    <option key={day} value={index}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <CaretDownIcon size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="newStartFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Start Time:
                        </label>
                        <div className="relative w-full">
                            <select
                                id="newStartFrom"
                                value={newStartFrom}
                                onChange={(e) => setNewStartFrom(parseInt(e.target.value))}
                                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                            >
                                {hours.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}:00
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <CaretDownIcon size={16} className="text-gray-400" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                            Duration: {interval.endTo - interval.startFrom} hour(s). End time will be auto-adjusted.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmitMove}
                        className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                    >
                       <ShuffleIcon className="inline mr-2"/> Move Interval
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default MoveIntervalForm; 