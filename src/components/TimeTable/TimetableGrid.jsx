import React from 'react';
import { TrashIcon } from "@phosphor-icons/react";
export default function TimetableGrid({
    selectedLevel,
    timeTableData,
    hours,
    days,
    handleCellClick,
    handleDeleteCourse,
}) {
    if (!selectedLevel) return null;

    const levelData = timeTableData.levelsTables[selectedLevel];

    if (!levelData || !levelData.table) {
        return (
            <div className="p-4 text-center bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-md">
                <p className="text-yellow-700 dark:text-yellow-300">Unable to display timetable for level {selectedLevel}.</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">The timetable data structure is incomplete or invalid.</p>
            </div>
        );
    }

    const data = levelData.table;

    return (
        <table className="min-w-full border-separate border-spacing-0">
            <thead>
                <tr>
                    <th className="sticky left-0 top-0 z-20 bg-gray-50 dark:bg-secondary-dark p-3 border-b border-r border-gray-200 dark:border-neutral-700 font-semibold text-left text-sm text-gray-700 dark:text-gray-200 shadow-sm">
                        Day / Time
                    </th>
                    {hours.map((h) => (
                        <th
                            key={h}
                            className="sticky top-0 z-10 bg-gray-50 dark:bg-secondary-dark p-2 border-b border-gray-200 dark:border-neutral-700 font-semibold text-center text-sm text-gray-700 dark:text-primary-light shadow-sm"
                        >
                            {h}:00 - {h + 1}:00
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {days.map((day, rowIndex) => (
                    <tr key={day} className={rowIndex % 2 === 0 ? "bg-white dark:bg-secondary-dark" : "bg-gray-50 dark:bg-secondary-dark/90"}>
                        <td className="sticky left-0 z-10 bg-white dark:bg-secondary-dark p-3 border-r border-gray-200 dark:border-neutral-700 font-medium text-sm text-gray-700 dark:text-primary-light group">
                            {day}
                        </td>
                        {hours.map((hour) => {
                            const intervals = Array.isArray(data[day]) ? data[day] : [];
                            const interval = intervals.find(
                                (i) =>
                                    i &&
                                    typeof i.startFrom === "number" &&
                                    typeof i.endTo === "number" &&
                                    hour >= i.startFrom &&
                                    hour < i.endTo
                            );

                            if (interval) {
                                if (!interval.info) {
                                    console.error("Interval missing info:", interval);
                                    return (
                                        <td
                                            key={hour}
                                            className="border border-gray-200 dark:border-neutral-700 bg-red-100 dark:bg-red-900/40 min-w-[120px] h-20 text-xs p-1"
                                        >
                                            Error: Missing Info
                                        </td>
                                    );
                                }

                                const isLecture = interval.info.courseType === 0;
                                const colspan = interval.endTo - interval.startFrom;

                                if (hour > interval.startFrom && hour < interval.endTo) {
                                    return null;
                                }

                                return (
                                    <td
                                        key={hour}
                                        colSpan={colspan}
                                        onClick={() => handleCellClick(interval, day)}
                                        className={`group relative border border-gray-200 dark:border-primary p-1.5 text-center cursor-pointer transition-all duration-150 hover:shadow-sm rounded min-w-[100px] h-16 md:h-20 ${
                                            isLecture
                                                ? "bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40"
                                                : "bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-800/40"
                                        }`}
                                    >
                                        <div className="flex flex-col justify-between h-full p-1">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{interval.info.courseCode || "N/A"}</p>
                                                <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-0.5">{interval.info.teachingAssistant || "N/A"}</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400">{interval.info.teachingPlace || "N/A"}</p>
                                            </div>
                                            <p className={`text-[10px] font-medium mt-1 ${
                                                isLecture ? "text-primary dark:text-primary-light" : "text-purple-700 dark:text-primary-light"
                                            }`}>
                                                {isLecture ? "Lecture" : "Practical"}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCourse({ interval, day });
                                            }}
                                            title="Delete Interval"
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            <TrashIcon size={10} />
                                        </button>
                                    </td>
                                );
                            }

                            return <td key={hour} className="border border-gray-200 dark:border-neutral-300/15 min-w-[100px] h-16 md:h-20" />;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
} 