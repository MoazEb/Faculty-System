import React from "react";
import { PlusIcon, MagnifyingGlassIcon, CaretDownIcon } from "@phosphor-icons/react";
import { LEVEL_MAP } from "../../constants/levelMap";

const StudentControls = ({ onAddStudent, onSearch, onFilterChange, currentFilters }) => {
    return (
        <div className="mb-6 p-4 bg-white dark:bg-secondary-dark shadow rounded-lg flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="w-full lg:w-1/3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none aria-hidden">
                    <MagnifyingGlassIcon size={20} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:placeholder:text-gray-400"
                    onChange={(e) => onSearch(e.target.value)}
                    value={currentFilters?.name || ""}
                />
            </div>

            {/* Filters */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                <div className="relative w-full sm:w-auto ">
                    <select
                        className="pl-4 pr-8 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-40 appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                        onChange={(e) => onFilterChange("level", e.target.value)}
                        value={currentFilters?.level || "1"}
                    >
                        <option value="1">{LEVEL_MAP[1]}</option>
                        <option value="2">{LEVEL_MAP[2]}</option>
                        <option value="3">{LEVEL_MAP[3]}</option>
                        <option value="4">{LEVEL_MAP[4]}</option>
                        <option value="5">{LEVEL_MAP[5]}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CaretDownIcon size={16} className="text-gray-400" />
                    </div>
                </div>
                <div className="relative w-full sm:w-auto">
                    <select
                        className="pl-4 pr-8 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-40 appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                        onChange={(e) => onFilterChange("gender", e.target.value)}
                        value={currentFilters?.gender || ""}
                    >
                        <option value="">All Genders</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CaretDownIcon size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Add Student Button */}
            <div className="w-full lg:w-auto">
                <button
                    onClick={onAddStudent}
                    className="w-full lg:w-auto bg-primary hover:bg-secondary text-white font-semibold py-3 lg:py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 flex items-center justify-center cursor-pointer"
                >
                    <PlusIcon size={20} weight="bold" className="mr-2" />
                    Add New Student
                </button>
            </div>
        </div>
    );
};

export default StudentControls;
