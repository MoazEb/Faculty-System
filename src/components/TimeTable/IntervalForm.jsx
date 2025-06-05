import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTimetableStore } from "../../stores/useTimetableStore";
import Modal from "react-modal";

const IntervalForm = ({ show, onClose }) => {
    const { 
        addInterval, 
        dayNames, 
        courseTypes, 
        placesList, 
        staffList, 
        timeTableData 
    } = useTimetableStore();
    
    const [level, setLevel] = useState(1);
    const [intervalForm, setIntervalForm] = useState({
        day: 0,
        startFrom: 8,
        endTo: 9,
        courseCode: "",
        courseType: 0,
        teachingPlace: "",
        teachingAssistant: "",
    });

    const updateIntervalEndTime = () => {
        const course = timeTableData?.inMatchedCourses?.find(
            (c) => c.code === intervalForm.courseCode
        );
        if (course) {
            const duration = intervalForm.courseType === 0 ? course.lectureHours : course.practicalHours;
            setIntervalForm((prev) => ({
                ...prev,
                endTo: prev.startFrom + duration,
            }));
        } else {
            // Default to 1 hour if course not found or no duration
            setIntervalForm((prev) => ({
                ...prev,
                endTo: prev.startFrom + 1,
            }));
        }
    };

    const handleAddInterval = async () => {
        if (!intervalForm.courseCode || !intervalForm.teachingPlace || !intervalForm.teachingAssistant) {
            toast.error("Please fill all required fields");
            return;
        }
        
        const success = await addInterval({
            level: level,
            day: intervalForm.day,
            interval: {
                startFrom: intervalForm.startFrom,
                endTo: intervalForm.endTo,
                info: {
                    courseCode: intervalForm.courseCode,
                    courseType: intervalForm.courseType,
                    courseLevel: level,
                    teachingPlace: intervalForm.teachingPlace,
                    teachingAssistant: intervalForm.teachingAssistant,
                },
            },
        });

        if (success) {
            toast.success("Interval added successfully");
            onClose();
        }
    };

    useEffect(() => {
        if (show) {
            updateIntervalEndTime();
        }
    }, [intervalForm.courseCode, intervalForm.courseType, intervalForm.startFrom, show]);

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            contentLabel="Insert Interval Modal"
            appElement={document.getElementById('root') || undefined}
        >
            <h2 className="text-xl font-semibold mb-4 dark:text-primary-light">Insert Interval</h2>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-primary-light">Level:</label>
                        <select
                            value={level}
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        >
                            <option value="1">First</option>
                            <option value="2">Second</option>
                            <option value="3">Third</option>
                            <option value="4">Fourth</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-primary-light">Day:</label>
                        <select
                            value={intervalForm.day}
                            onChange={(e) =>
                                setIntervalForm((prev) => ({ ...prev, day: parseInt(e.target.value) }))
                            }
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        >
                            {dayNames.map((day, index) => (
                                <option key={day} value={index}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-primary-light">Start From (hour):</label>
                        <input
                            type="number"
                            min="8"
                            max="17"
                            value={intervalForm.startFrom}
                            onChange={(e) =>
                                setIntervalForm((prev) => ({
                                    ...prev,
                                    startFrom: parseInt(e.target.value),
                                }))
                            }
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-primary-light">End To (hour):</label>
                        <input
                            type="number"
                            value={intervalForm.endTo}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 dark:bg-secondary-dark dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-primary-light">Course Code:</label>
                        <select
                            value={intervalForm.courseCode}
                            onChange={(e) => setIntervalForm((prev) => ({ ...prev, courseCode: e.target.value }))}
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Course</option>
                            {timeTableData?.inMatchedCourses?.map((course) => (
                                <option key={course.code} value={course.code}>
                                    {course.code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-primary-light">Course Type:</label>
                        <select
                            value={intervalForm.courseType}
                            onChange={(e) =>
                                setIntervalForm((prev) => ({
                                    ...prev,
                                    courseType: parseInt(e.target.value),
                                }))
                            }
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        >
                            {courseTypes.map((type, index) => (
                                <option key={type} value={index}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-primary-light">Teaching Place:</label>
                    <select
                        value={intervalForm.teachingPlace}
                        onChange={(e) =>
                            setIntervalForm((prev) => ({ ...prev, teachingPlace: e.target.value }))
                        }
                        className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Select Place</option>
                        {placesList.map((place) => (
                            <option key={place} value={place}>
                                {place}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-primary-light">Teaching Assistant:</label>
                    <select
                        value={intervalForm.teachingAssistant}
                        onChange={(e) =>
                            setIntervalForm((prev) => ({ ...prev, teachingAssistant: e.target.value }))
                        }
                        className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Select Assistant</option>
                        {staffList.map((staff) => (
                            <option key={staff} value={staff}>
                                {staff}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddInterval}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
};

export default IntervalForm;
