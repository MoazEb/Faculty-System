import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useCoursesStore } from "../../stores/useCoursesStore";
import Spinner from "../common/Spinner";
import { CaretDownIcon } from "@phosphor-icons/react";

const EditCourseModal = ({ course, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        creditHours: 3,
        level: 1,
        semester: 1,
        type: 0,
        lectureHours: 1,
    });

    const { updateCourse, isLoading } = useCoursesStore();

    useEffect(() => {
        if (course) {
            setFormData({
                code: course.code || "",
                name: course.name || "",
                creditHours: course.creditHours || 3,
                level: course.level || 1,
                semester: course.semester || 1,
                type: course.type || 0,
                lectureHours: course.lectureHours || 1,
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "creditHours" ||
                name === "level" ||
                name === "semester" ||
                name === "type" ||
                name === "lectureHours"
                    ? parseInt(value, 10)
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.code) {
            toast.error("Course name and code are required.");
            return;
        }
        if (formData.creditHours < 1 || formData.creditHours > 3) {
            toast.error("Credit hours must be between 1 and 3");
            return;
        }
        await updateCourse(course.id, formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Course Modal">
            <h2 className="text-2xl font-semibold mb-4 dark:text-primary-light">Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Course Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ex: Computer Networks"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:bg-secondary-dark"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Course Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        placeholder="Ex: CS101"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:bg-secondary-dark"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="creditHours" className="block text-sm font-medium dark:text-gray-300 mb-1">
                            Credit Hours (1-3)
                        </label>
                        <input
                            type="number"
                            name="creditHours"
                            id="creditHours"
                            min="1"
                            max="3"
                            value={formData.creditHours}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:bg-secondary-dark"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="level" className="block text-sm font-medium dark:text-gray-300 mb-1">
                            Level (1-4)
                        </label>
                        <div className="relative w-full">
                            <select
                                name="level"
                                id="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                                required
                            >
                                {[1, 2, 3, 4].map((level) => (
                                    <option key={level} value={level}>
                                        Level {level}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <CaretDownIcon size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium dark:text-gray-300 mb-1">
                            Semester
                        </label>
                        <div className="relative w-full">
                            <select
                                name="semester"
                                id="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                                required
                            >
                                <option value={1}>Semester 1</option>
                                <option value={2}>Semester 2</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <CaretDownIcon size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lectureHours" className="block text-sm font-medium dark:text-gray-300 mb-1">
                            Lecture Hours
                        </label>
                        <div className="relative w-full">
                            <select
                                name="lectureHours"
                                id="lectureHours"
                                value={formData.lectureHours}
                                onChange={handleChange}
                                className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                                required
                            >
                                <option value={0}>0 Hours</option>
                                <option value={1}>1 Hour</option>
                                <option value={2}>2 Hours</option>
                                <option value={3}>3 Hours</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <CaretDownIcon size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Course Type
                    </label>
                    <div className="relative w-full">
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                            required
                        >
                            <option value={0}>Lecture</option>
                            <option value={1}>Practical</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <CaretDownIcon size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer dark:focus:ring-offset-secondary-dark"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer dark:focus:ring-offset-secondary-dark"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Spinner />
                                Updating...
                            </div>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditCourseModal;
