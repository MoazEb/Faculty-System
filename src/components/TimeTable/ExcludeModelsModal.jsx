import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useTeachingStaffStore } from '../../stores/useTeachingStaffStore';
import { useTeachingPlacesStore } from '../../stores/useTeachingPlacesStore';
import { useCoursesStore } from '../../stores/useCoursesStore';
import Spinner from '../common/Spinner';

const ExcludeModelsModal = ({ show, onClose, onConfirm }) => {
    const { teachingStaff, getAllTeachingStaff, isLoading: isLoadingTeachingStaff } = useTeachingStaffStore();
    const { teachingPlaces, getTeachingPlaces, isLoading: isLoadingTeachingPlaces } = useTeachingPlacesStore();
    const { courses, getAllCourses, isLoading: isLoadingCourses } = useCoursesStore();

    const [excludedStaff, setExcludedStaff] = useState([]);
    const [excludedPlaces, setExcludedPlaces] = useState([]);
    const [excludedCourses, setExcludedCourses] = useState([]);
    
    const isLoading = isLoadingTeachingStaff || isLoadingTeachingPlaces || isLoadingCourses;

    useEffect(() => {
        if (show) {
            getAllTeachingStaff();
            getTeachingPlaces();
            getAllCourses();
        }
    }, [show, getAllTeachingStaff, getTeachingPlaces, getAllCourses]);

    const handleStaffChange = (userName) => {
        setExcludedStaff(prev =>
            prev.includes(userName) ? prev.filter(s => s !== userName) : [...prev, userName]
        );
    };

    const handlePlaceChange = (placeId) => {
        setExcludedPlaces(prev =>
            prev.includes(placeId) ? prev.filter(p => p !== placeId) : [...prev, placeId]
        );
    };

    const handleCourseChange = (courseId) => {
        setExcludedCourses(prev =>
            prev.includes(courseId) ? prev.filter(c => c !== courseId) : [...prev, courseId]
        );
    };

    const handleSubmit = () => {
        onConfirm({
            StaffUserName: excludedStaff,
            PlacesId: excludedPlaces,
            CoursesId: excludedCourses,
        });
        onClose();
    };

    const modalStyles = {
        content: {
            maxWidth: "48rem", // Increased width to accommodate three columns
            width: "100%",
            maxHeight: "90vh",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '2rem',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
    };

    return (
        <Modal isOpen={show} onRequestClose={onClose} style={modalStyles} contentLabel="Exclude Models Modal">
            <h2 className="text-xl font-semibold mb-6 dark:text-primary-light text-center">Exclude Models from Generation</h2>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner size={10} color="text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Staff Exclusion */}
                    <div>
                        <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Exclude Staff</h3>
                        <div className="max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                            {teachingStaff && teachingStaff.length > 0 ? teachingStaff.map(staff => (
                                <label key={staff.userName} className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <input
                                        type="checkbox"
                                        checked={excludedStaff.includes(staff.userName)}
                                        onChange={() => handleStaffChange(staff.userName)}
                                        className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-300"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">{staff.fullName} ({staff.userName})</span>
                                </label>
                            )) : <p className="text-sm text-gray-500 dark:text-gray-400">No staff available.</p>}
                        </div>
                    </div>

                    {/* Places Exclusion */}
                    <div>
                        <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Exclude Places</h3>
                        <div className="max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                            {teachingPlaces && teachingPlaces.length > 0 ? teachingPlaces.map(place => (
                                <label key={place.id} className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <input
                                        type="checkbox"
                                        checked={excludedPlaces.includes(place.id)}
                                        onChange={() => handlePlaceChange(place.id)}
                                        className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-300"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">{place.name}</span>
                                </label>
                            )) : <p className="text-sm text-gray-500 dark:text-gray-400">No places available.</p>}
                        </div>
                    </div>

                    {/* Courses Exclusion */}
                    <div>
                        <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Exclude Courses</h3>
                        <div className="max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-600">
                            {courses && courses.length > 0 ? courses.map(course => (
                                <label key={course.id} className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                    <input
                                        type="checkbox"
                                        checked={excludedCourses.includes(course.id)}
                                        onChange={() => handleCourseChange(course.id)}
                                        className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:focus:ring-blue-300"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">{course.name}</span>
                                </label>
                            )) : <p className="text-sm text-gray-500 dark:text-gray-400">No courses available.</p>}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-3 mt-8">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isLoading ? 'Loading...' : 'Generate'}
                </button>
            </div>
        </Modal>
    );
};

export default ExcludeModelsModal; 