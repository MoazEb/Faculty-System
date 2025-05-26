import React from "react";
import { PlusIcon, MagnifyingGlassIcon, CaretDownIcon } from "@phosphor-icons/react";

const TeachingPlacesControls = ({ onAddPlace, onSearch, onFilterChange }) => {
    return (
        <div className="mb-6 p-4 bg-white dark:bg-secondary-dark shadow rounded-lg flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="w-full lg:w-1/3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none aria-hidden">
                    <MagnifyingGlassIcon size={20} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search teaching places..."
                    className="w-full pl-10 pr-4 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:placeholder:text-gray-400"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                <div className="relative w-full sm:w-auto ">
                    <select
                        className="pl-4 pr-8 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-48 appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                        onChange={(e) => onFilterChange("type", e.target.value)}
                        defaultValue=""
                    >
                        <option value="">All Types</option>
                        <option value="0">Hall</option>
                        <option value="1">Lab</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CaretDownIcon size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Add Place Button */}
            <div className="w-full lg:w-auto">
                <button
                    onClick={onAddPlace}
                    className="w-full lg:w-auto bg-primary hover:bg-secondary text-white font-semibold py-3 lg:py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 flex items-center justify-center cursor-pointer"
                >
                    <PlusIcon size={20} weight="bold" className="mr-2" />
                    Add New Teaching Place
                </button>
            </div>
        </div>
    );
};

export default TeachingPlacesControls;
