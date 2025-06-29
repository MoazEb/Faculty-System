import React from "react";
import { PlusIcon, MagnifyingGlassIcon, CaretDownIcon } from "@phosphor-icons/react";
import { LEVEL_MAP } from "../../constants/levelMap";

const TeachingStaffControls = ({ onAddStaff, onSearch, onFilterChange, currentFilters, searchTerm }) => {
    return (
        <div className="mb-6 p-4 bg-white dark:bg-secondary-dark shadow rounded-lg flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="w-full lg:w-1/3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon size={20} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search staff..."
                    className="w-full pl-10 pr-4 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:placeholder:text-gray-400 dark:bg-neutral-700"
                    onChange={(e) => onSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>

            {/* Filters */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                <div className="relative w-full sm:w-auto">
                    <select
                        className="pl-4 pr-8 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-40 appearance-none cursor-pointer dark:text-primary-light dark:bg-neutral-700"
                        onChange={(e) => onFilterChange("level", e.target.value)}
                        value={currentFilters.level || ""}
                    >
                        <option value="">All Positions</option>
                        {[6, 7, 8, 9, 10].map((level) => (
                            <option key={level} value={level}>
                                {LEVEL_MAP[level]}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CaretDownIcon size={16} className="text-gray-400" />
                    </div>
                </div>
                <div className="relative w-full sm:w-auto">
                    <select
                        className="pl-4 pr-8 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-40 appearance-none cursor-pointer dark:text-primary-light dark:bg-neutral-700"
                        onChange={(e) => onFilterChange("gender", e.target.value)}
                        value={currentFilters.gender || ""}
                    >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CaretDownIcon size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Add Staff Button */}
            <div className="w-full lg:w-auto">
                <button
                    onClick={onAddStaff}
                    className="w-full lg:w-auto bg-primary hover:bg-secondary text-white font-semibold py-3 lg:py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 flex items-center justify-center cursor-pointer"
                >
                    <PlusIcon size={20} weight="bold" className="mr-2" />
                    Add New Staff
                </button>
            </div>
        </div>
    );
};

export default TeachingStaffControls;
