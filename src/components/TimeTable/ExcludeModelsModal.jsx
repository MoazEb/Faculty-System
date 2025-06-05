import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTimetableStore } from '../../stores/useTimetableStore';


const ExcludeModelsModal = ({ show, onClose, onConfirm }) => {
    const { staffList, placesList } = useTimetableStore();
    // const coursesList = ["Course A", "Course B", "Course C", "Course D", "Course E"];


    const [excludedStaff, setExcludedStaff] = useState([]);
    const [excludedPlaces, setExcludedPlaces] = useState([]);
    const [excludedCourses, setExcludedCourses] = useState([]);

    const extractUsername = (staffName) => {
        const match = staffName.match(/\(([^)]+)\)/);
        return match ? match[1] : staffName;
    };

    const handleStaffChange = (username) => {
        setExcludedStaff(prev =>
            prev.includes(username) ? prev.filter(s => s !== username) : [...prev, username]
        );
    };

    const handlePlaceChange = (placeName) => {
        setExcludedPlaces(prev =>
            prev.includes(placeName) ? prev.filter(p => p !== placeName) : [...prev, placeName]
        );
    };

    const handleCourseChange = (courseName) => {
        setExcludedCourses(prev =>
            prev.includes(courseName) ? prev.filter(c => c !== courseName) : [...prev, courseName]
        );
    };

    const handleSubmit = () => {
        onConfirm({
            StaffUserName: excludedStaff,
            PlacesId: excludedPlaces, // Assuming PlacesId are the names for now
            CoursesId: excludedCourses, // Assuming CoursesId are the names for now
        });
        onClose();
    };

    const modalStyles = {
        content: {
            maxWidth: "36rem", // Increased width
            width: "100%",
            maxHeight: "90vh",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '2rem', // Increased padding
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
    };

    return (
        <Modal isOpen={show} onRequestClose={onClose} style={modalStyles} contentLabel="Exclude Models Modal">
            <h2 className="text-xl font-semibold mb-6 dark:text-primary-light text-center">Exclude Models from Generation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Staff Exclusion */}
                <div>
                    <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Exclude Staff</h3>
                    <div className="max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                        {staffList && staffList.length > 0 ? staffList.map(staffFullString => {
                            const username = extractUsername(staffFullString);
                            return (
                                <label key={staffFullString} className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <input
                                        type="checkbox"
                                        checked={excludedStaff.includes(username)}
                                        onChange={() => handleStaffChange(username)}
                                        className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-300"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">{staffFullString}</span>
                                </label>
                            );
                        }) : <p className="text-sm text-gray-500 dark:text-gray-400">No staff available.</p>}
                    </div>
                </div>

                {/* Places Exclusion */}
                <div>
                    <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Exclude Places</h3>
                    <div className="max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                        {placesList && placesList.length > 0 ? placesList.map(place => (
                            <label key={place} className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <input
                                    type="checkbox"
                                    checked={excludedPlaces.includes(place)}
                                    onChange={() => handlePlaceChange(place)}
                                    className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-300"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{place}</span>
                            </label>
                        )) : <p className="text-sm text-gray-500 dark:text-gray-400">No places available.</p>}
                    </div>
                </div>

                {/* Courses Exclusion */}
                {/* <div>
                    <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Exclude Courses</h3>
                    <div className="max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                        {coursesList.length > 0 ? coursesList.map(course => (
                            <label key={course} className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <input
                                    type="checkbox"
                                    checked={excludedCourses.includes(course)}
                                    onChange={() => handleCourseChange(course)}
                                    className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-300"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{course}</span>
                            </label>
                        )) : <p className="text-sm text-gray-500 dark:text-gray-400">No courses available.</p>}
                    </div>
                </div> */}
            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 cursor-pointer"
                >
                    Generate
                </button>
            </div>
        </Modal>
    );
};

export default ExcludeModelsModal; 