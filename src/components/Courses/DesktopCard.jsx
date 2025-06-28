import React from "react";
import { PencilSimpleIcon, TrashIcon, ShareNetworkIcon } from "@phosphor-icons/react";

export default function DesktopCard({ course, handleEdit, handleDelete, handleManageDependencies }) {
    return (
        <div className="hidden lg:flex items-center py-4 px-6 bg-white dark:bg-secondary-dark dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 hover:bg-primary/5 dark:hover:bg-primary/20  transition-colors duration-150 group">
            {/* Column 1: Course Name & Code */}
            <div className="flex-[0_0_30%] min-w-0 flex items-center pr-4 ">
                <div className="min-w-0 w-full">
                    <div
                        className="font-semibold text-sm text-gray-800 dark:text-primary-light group-hover:text-primary transition-colors truncate"
                        title={course.code}
                    >
                        {course.code}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 truncate">{course.name}</div>
                </div>
            </div>

            {/* Column 2: Credit Hours */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Credits</div> */}
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.creditHours}</div>
                </div>
            </div>

            {/* Column 3: Lecture Hours */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Lecture</div> */}
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.lectureHours}</div>
                </div>
            </div>

            {/* Column 4: Level */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Level</div> */}
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.level}</div>
                </div>
            </div>

            {/* Column 5: Semester */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Semester</div> */}
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.semester}</div>
                </div>
            </div>

            {/* Column 6: Type */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Type</div> */}
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.type === 0 ? "Lecture" : "Practical"}</div>
                </div>
            </div>

            {/* Column 7: Actions */}
            <div className="flex-auto min-w-0 flex justify-end items-center gap-2 pl-4">
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
    );
}
