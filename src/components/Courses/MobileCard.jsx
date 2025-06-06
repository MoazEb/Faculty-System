import React from "react";
import { TrashIcon, PencilSimpleIcon, ShareNetworkIcon } from "@phosphor-icons/react";

export default function MobileCard({ course, handleEdit, handleDelete, handleManageDependencies }) {
    return (
        <div className="bg-white dark:bg-secondary-dark rounded-xl border border-gray-200 dark:border-neutral-600 hover:shadow-lg transition-all duration-300 overflow-hidden lg:hidden">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-secondary-dark px-4 py-3 border-b border-gray-100 dark:border-neutral-600">
                <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-light mb-1">
                            {course.code}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium dark:text-neutral-400">{course.name}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-3">
                        <button
                            onClick={handleEdit}
                            className="p-2 text-primary dark:text-primary-light/90 dark:hover:bg-gray-100/15 bg-primary/20 dark:bg-gray-100/5 hover:bg-primary/25 rounded-lg transition-all duration-200 cursor-pointer"
                            title="Edit Course"
                        >
                            <PencilSimpleIcon size={18} />
                        </button>
                        <button
                            onClick={() => handleManageDependencies(course)}
                            className="p-2 text-green-600 bg-green-100/70 hover:bg-green-200 dark:bg-gray-100/5 dark:hover:bg-gray-100/20 hover:text-green-600 rounded-lg transition-all duration-200 cursor-pointer"
                            title="Manage Dependencies"
                        >
                            <ShareNetworkIcon size={18} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-red-600 bg-red-100/70 hover:bg-red-200 dark:bg-gray-100/5 dark:hover:bg-gray-100/20 hover:text-red-600 rounded-lg transition-all duration-200 cursor-pointer"
                            title="Delete Course"
                        >
                            <TrashIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Course Metrics 
            <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                    //Credit Hours
                    <div className="p-2 bg-primary/5 font-medium rounded-lg border border-gray-100 text-center">
                        <div className="text-lg text-gray-900">{course.creditHours}</div>
                        <div className="text-xs text-gray-600">Credits</div>
                    </div>
                    //Lecture Hours
                    <div className="p-2 bg-primary/5 font-medium rounded-lg border border-gray-100 text-center">
                        <div className="text-lg text-gray-900">{course.lectureHours}</div>
                        <div className="text-xs text-gray-600">Hours</div>
                    </div>
                    //Level
                    <div className="p-2 bg-primary/5 font-medium rounded-lg border border-gray-100 text-center">
                        <div className="text-lg text-gray-900">{course.level}</div>
                        <div className="text-xs text-gray-600">Level</div>
                    </div>
                    Semester
                    <div className="p-2 bg-primary/5 font-medium rounded-lg border border-gray-100 text-center">
                        <div className="text-lg text-gray-900">{course.semester}</div>
                        <div className="text-xs text-gray-600">Semester</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
