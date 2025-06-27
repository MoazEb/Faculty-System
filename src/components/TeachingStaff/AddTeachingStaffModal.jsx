import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useTeachingStaffStore } from "../../stores/useTeachingStaffStore";
import Spinner from "../common/Spinner";
import { CaretDownIcon } from "@phosphor-icons/react";
import { LEVEL_MAP } from "../../constants/levelMap";

const AddTeachingStaffModal = ({ isOpen, onClose, selectedLevel, selectedGender }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: selectedGender ? parseInt(selectedGender, 10) : 0,
        role: 1, // 1 for teaching staff
        level: selectedLevel ? parseInt(selectedLevel, 10) : 6, // Default to Demonstrator
        dateOfBirth: "",
        password: "",
    });

    // Update formData when props change
    useEffect(() => {
        console.log("Selected level changed:", selectedLevel);
        setFormData(prev => ({
            ...prev,
            level: selectedLevel ? parseInt(selectedLevel, 10) : 6,
            gender: selectedGender ? parseInt(selectedGender, 10) : prev.gender
        }));
    }, [selectedLevel, selectedGender]);

    const { addTeachingStaff, isLoading } = useTeachingStaffStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "level" || name === "gender" || name === "role" ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.password) {
            toast.error("Please fill all required fields.");
            return;
        }
        try {
            await addTeachingStaff(formData);
            onClose();
        } catch (error) {
            console.error("Error adding teaching staff:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Teaching Staff Modal">
            <h2 className="text-2xl font-semibold mb-4 dark:text-primary-light">Add Teaching Staff</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Ex: Ahmed"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary-dark dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Ex: Ali"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary-dark dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Gender
                    </label>
                    <div className="relative w-full">
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                            required
                        >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <CaretDownIcon size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Position
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
                            <option value={6}>{LEVEL_MAP[6]}</option>
                            <option value={7}>{LEVEL_MAP[7]}</option>
                            <option value={8}>{LEVEL_MAP[8]}</option>
                            <option value={9}>{LEVEL_MAP[9]}</option>
                            <option value={10}>{LEVEL_MAP[10]}</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <CaretDownIcon size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary-dark dark:border-neutral-500 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary-dark dark:border-neutral-500 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                        required
                    />
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
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Spinner />
                                Adding...
                            </div>
                        ) : (
                            "Add Teaching Staff"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddTeachingStaffModal;
