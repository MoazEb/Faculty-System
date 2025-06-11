import React, { useEffect, useCallback } from "react";
import Modal from "react-modal";
import CustomSelect from "../common/CustomSelect";
import Spinner from "../common/Spinner";
import { TrashIcon, PlusIcon, LinkIcon, LinkBreakIcon } from "@phosphor-icons/react";
import { useDependenciesStore } from "../../stores/useDependenciesStore";

const ManageDependenciesModal = ({ isOpen, onClose, course }) => {
    const {
        childDependencies,
        parentDependencies,
        allCourses,
        isLoading,
        isFetchingData,
        selectedCourseToAdd,
        setSelectedCourseToAdd,
        fetchAllData,
        handleAddChildDependency: handleAddChildDependencyStore,
        handleDeleteDependency: handleDeleteDependencyStore,
        resetDependencies
    } = useDependenciesStore();

    const stableFetchAllData = useCallback(fetchAllData, [fetchAllData]);
    const stableResetDependencies = useCallback(resetDependencies, [resetDependencies]);

    useEffect(() => {
        if (isOpen && course?.id) {
            stableFetchAllData(course.id);
        } else {
            stableResetDependencies();
        }
    }, [isOpen, course, stableFetchAllData, stableResetDependencies]);
    
    const handleAddChildDependency = async () => {
        await handleAddChildDependencyStore(course.id);
    };

    const handleDeleteDependency = async (parentId) => {
        await handleDeleteDependencyStore(course.id, parentId);
    };


    const currentRelatedCourseIds = new Set([...childDependencies.map(c => c.id), ...parentDependencies.map(p => p.id)]);

    const filteredCoursesForSelection = allCourses.filter(c =>
        c.id !== course?.id && // Cannot add itself
        !currentRelatedCourseIds.has(c.id) // Not already a child or parent dependency
    );

    const selectOptions = filteredCoursesForSelection.map(c => ({
        value: c.id,
        label: `${c.name} (${c.code}) - Level ${c.level}`
    }));

    const selectedValue = selectOptions.find(option => option.value === selectedCourseToAdd);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Manage Course Dependencies"
         >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-neutral-600">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-primary-light">
                        Manage Dependencies: <span className="font-bold text-primary">{course?.name}</span>
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>


                {isFetchingData && !allCourses.length && !childDependencies.length && !parentDependencies.length ? (
                    <div className="flex justify-center items-center h-64"><Spinner size={10} /></div>
                ) : (
                    <>
                        {/* Add Pre-requisite (Child) Section */}
                        <div className="mb-6 p-4 border border-gray-200 dark:border-neutral-600 rounded-md bg-gray-50 dark:bg-neutral-700/30">
                            <label htmlFor="addDependencySelect" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Add New Pre-requisite for <span className="font-bold text-primary">{course?.code || "this course"}</span>
                            </label>
                            <div className="relative flex items-center gap-2">
                                <CustomSelect
                                    id="addDependencySelect"
                                    options={selectOptions}
                                    value={selectedValue}
                                    onChange={(option) => setSelectedCourseToAdd(option ? option.value : "")}
                                    placeholder={isFetchingData && !allCourses.length ? "Loading courses..." : "Select a course..."}
                                    isDisabled={isLoading || isFetchingData || filteredCoursesForSelection.length === 0}
                                    isLoading={isFetchingData && !allCourses.length}
                                />
                                <button
                                    onClick={handleAddChildDependency}
                                    disabled={isLoading || isFetchingData || !selectedCourseToAdd}
                                    className={`p-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center min-w-[40px] h-[40px] ${(isLoading || isFetchingData || !selectedCourseToAdd) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    title="Add as Pre-requisite"
                                >
                                    {isLoading ? <Spinner size={5} color="text-white" /> : <PlusIcon size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 flex-grow overflow-y-auto pr-1 max-h-[55vh]">
                            {/* Current Child Dependencies Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-3 flex items-center">
                                    <LinkIcon size={20} className="text-blue-500" />
                                    <span className="ml-2">Pre-requisites</span>
                                </h3>
                                {isFetchingData && !childDependencies.length ? (
                                    <div className="flex justify-center items-center h-10"><Spinner size={6}/></div>
                                ) : childDependencies.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
                                        {childDependencies.map((dep) => (
                                            <li
                                                key={dep.id}
                                                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-neutral-700/60 rounded-md shadow-sm hover:shadow-md transition-shadow duration-150"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-700 dark:text-primary-light">{dep.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Code: {dep.code} {dep.level && `| Level: ${dep.level}`}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic max-w-xs">
                                        No pre-requisites for this course.
                                    </p>
                                )}
                            </div>

                            {/* Current Parent Dependencies Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-3 flex items-center">
                                    <LinkBreakIcon size={20} className="text-purple-500" />
                                    <span className="ml-2">Required For</span>
                                </h3>
                                {isFetchingData && !parentDependencies.length ? (
                                    <div className="flex justify-center items-center h-10"><Spinner size={6}/></div>
                                ) : parentDependencies.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
                                        {parentDependencies.map((dep) => (
                                            <li
                                                key={dep.id}
                                                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-neutral-700/60 rounded-md shadow-sm hover:shadow-md transition-shadow duration-150"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-700 dark:text-primary-light">{dep.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Code: {dep.code} {dep.level && `| Level: ${dep.level}`}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteDependency(dep.id)}
                                                    disabled={isLoading}
                                                    className={`p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-full transition-colors duration-150 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                    title={`Remove dependency: ${course?.name} will no longer be a pre-requisite for ${dep.name}`}
                                                >
                                                    <TrashIcon size={18} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic max-w-xs">
                                        This course is not a pre-requisite for any other courses.
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Modal Actions */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-neutral-600">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-neutral-600 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-secondary-dark cursor-pointer"
                    >
                        Close
                    </button>
                </div>
        </Modal>
    );
};

export default ManageDependenciesModal; 