import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, CaretDownIcon } from "@phosphor-icons/react";
import { FiPlus, FiUpload, FiDownload, FiChevronDown } from "react-icons/fi";
import { LEVEL_MAP } from "../../constants/levelMap";
import UploadStudentsModal from "./UploadStudentsModal";

const StudentControls = ({
    onAddStudent,
    onSearch,
    onFilterChange,
    currentFilters,
    onDownloadTemplate,
    onDownloadStudents,
    onFileUpload,
}) => {
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
    const downloadMenuRef = useRef(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
                setShowDownloadMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [downloadMenuRef]);

    return (
        <div className="mb-6 p-4 bg-white dark:bg-secondary-dark shadow rounded-lg">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
                <div className="w-full lg:w-1/3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon size={20} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="w-full pl-10 pr-4 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:text-primary-light dark:placeholder:text-gray-400 dark:bg-neutral-700"
                        onChange={(e) => onSearch(e.target.value)}
                        value={currentFilters.name || ""}
                    />
                </div>
                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:w-auto">
                        <select
                            className="pl-4 pr-8 py-3 lg:py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-40 appearance-none cursor-pointer dark:text-primary-light dark:bg-neutral-700"
                            onChange={(e) => onFilterChange("level", e.target.value)}
                            value={currentFilters.level || ""}
                        >
                            <option value="">All Levels</option>
                            {[1, 2, 3, 4, 5].map(level => (
                                <option key={level} value={level}>{LEVEL_MAP[level]}</option>
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
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <button onClick={onAddStudent} className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 flex items-center justify-center cursor-pointer">
                    <FiPlus className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline font-light">Add Student</span>
                </button>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center cursor-pointer"
                >
                    <FiUpload className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline font-light">Upload XLSX</span>
                </button>
                <button
                    onClick={onDownloadTemplate}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center cursor-pointer"
                >
                    <FiDownload className="h-5 w-5 md:mr-2" />
                    <span className="hidden md:inline font-light">Template</span>
                </button>
                <div className="relative" ref={downloadMenuRef}>
                    <button
                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center cursor-pointer"
                    >
                        <FiDownload className="h-5 w-5 md:mr-2" />
                        <span className="hidden md:inline font-light">Download Students</span>
                        <FiChevronDown className="h-4 w-4 ml-2" />
                    </button>

                    {showDownloadMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-dark rounded-md shadow-lg z-50">
                            <div className="py-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => {
                                            onDownloadStudents(level);
                                            setShowDownloadMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-primary-light hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors"
                                    >
                                        {LEVEL_MAP[level]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <UploadStudentsModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={onFileUpload}
            />
        </div>
    );
};

export default StudentControls;
