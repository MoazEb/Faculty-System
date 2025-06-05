import React, { useState, useEffect } from "react";
import { useTimetableStore } from "../../stores/useTimetableStore";
import { toast } from "react-hot-toast";
import IntervalForm from "./IntervalForm";
import MoveIntervalForm from "./MoveIntervalForm";
import TimetableActions from "./TimetableActions";
import TimetableGrid from "./TimetableGrid";

export default function TimetableView() {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const { 
        dayNames : days,
        timeTableData,
        removeInterval,    
        showIntervalForm,
        closeIntervalForm,
        showMoveIntervalForm,
        closeMoveIntervalForm,
        intervalToMoveData,
        openMoveIntervalForm,
    } = useTimetableStore();
    const hours = Array.from({ length: 10 }, (_, i) => i + 8);

    useEffect(() => {
        if (timeTableData && timeTableData.levelsTables) {
            const levels = Object.keys(timeTableData.levelsTables);
            if (levels.length > 0) {
                if (!selectedLevel || !levels.includes(selectedLevel)) {
                    setSelectedLevel(levels[0]);
                }
            }
        }
    }, [timeTableData, selectedLevel]);

    const handleDeleteCourse = async ({ interval, day }) => {
        if (!timeTableData || !timeTableData.levelsTables) {
            toast.error("Timetable data is not loaded correctly.");
            return;
        }

        if (!selectedLevel) {
            toast.error("No level selected. Cannot delete course.");
            return;
        }

        const levelMap = {
            "first": 1,
            "second": 2,
            "third": 3,
            "fourth": 4, 
        };

        let originalLevelNumber;
        const normalizedSelectedLevel = selectedLevel.toLowerCase();

        if (normalizedSelectedLevel in levelMap) {
            originalLevelNumber = levelMap[normalizedSelectedLevel];
        } else {
            toast.error(`Invalid selected level: "${selectedLevel}". Expected "first", "second", "third", or "fourth".`);
            return;
        }

        const intervalToDelete = {
            level: originalLevelNumber,
            day: days.indexOf(day),
            interval: {
                startFrom: interval.startFrom,
                endTo: interval.endTo,
                info: {
                    courseCode: interval.info.courseCode,
                    courseType: interval.info.courseType,
                    courseLevel: originalLevelNumber, 
                    teachingPlace: interval.info.teachingPlace,
                    teachingAssistant: interval.info.teachingAssistant,
                },
            },
        };

        try {
            const success = await removeInterval(intervalToDelete);
            if (success) {
                toast.success("Course removed successfully.");
            } else {
                toast.error("Failed to remove course. Please try again.");
            }
        } catch (error) {
            console.error("Error removing interval:", error);
            toast.error("An error occurred while removing the course.");
        }
    };

    if (!timeTableData) {
        return (
            <div className="p-6 text-center">
                <h3 className="text-lg text-gray-500">No timetable data available</h3>
                <p className="text-sm text-gray-500">Generate or load a timetable to view</p>
            </div>
        );
    }

    const levels = Object.keys(timeTableData.levelsTables);

    const handleCellClick = (interval, day) => {
        if (interval) {
            openMoveIntervalForm({ interval, day });
        }
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between flex-wrap gap-2 mb-4 px-2">
                <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                        <button
                            key={level}
                            className={`px-4 py-2 rounded-lg text-sm dark:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
                                selectedLevel === level 
                                    ? "bg-primary text-white shadow-md hover:bg-primary/80 focus:ring-primary" 
                                    : "bg-primary/10 text-gray-700 hover:bg-primary/20 focus:ring-primary"
                            }`}
                            onClick={() => setSelectedLevel(level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>
                <TimetableActions />
            </div>

            <div className="overflow-auto max-w-full border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-secondary-dark">
                <TimetableGrid 
                    selectedLevel={selectedLevel}
                    timeTableData={timeTableData}
                    hours={hours}
                    days={days}
                    handleCellClick={handleCellClick}
                    handleDeleteCourse={handleDeleteCourse}
                />
            </div>

            {/* Modals */}
            {showIntervalForm && (
                <IntervalForm
                    show={showIntervalForm}
                    onClose={closeIntervalForm} 
                />
            )}

            {showMoveIntervalForm && intervalToMoveData && (
                <MoveIntervalForm
                    show={showMoveIntervalForm}
                    onClose={closeMoveIntervalForm} 
                    intervalToMove={intervalToMoveData}
                    dayNames={days}
                />
            )}
        </div>
    );
}
