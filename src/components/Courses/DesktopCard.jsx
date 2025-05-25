import React from "react";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

export default function DesktopCard({ course, handleEdit, handleDelete }) {
    return (
        <div className="hidden lg:flex items-center py-4 px-6 bg-white border-b border-gray-200 hover:bg-primary/5 transition-colors duration-150 group">
            {/* Column 1: Course Name & Code */}
            <div className="flex-[0_0_35%] min-w-0 flex items-center pr-4 ">
                <div className="min-w-0 w-full">
                    <div
                        className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors truncate"
                        title={course.code}
                    >
                        {course.code}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{course.name}</div>
                </div>
            </div>

            {/* Column 2: Credit Hours */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Credits</div> */}
                    <div className="text-sm font-medium text-gray-700">{course.creditHours}</div>
                </div>
            </div>

            {/* Column 3: Lecture Hours */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Lecture</div> */}
                    <div className="text-sm font-medium text-gray-700">{course.lectureHours}</div>
                </div>
            </div>

            {/* Column 4: Level */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Level</div> */}
                    <div className="text-sm font-medium text-gray-700">{course.level}</div>
                </div>
            </div>

            {/* Column 5: Semester */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    {/* <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Semester</div> */}
                    <div className="text-sm font-medium text-gray-700">{course.semester}</div>
                </div>
            </div>

            {/* Column 6: Actions */}
            <div className="flex-auto min-w-0 flex justify-end items-center gap-2 pl-4">
                <button
                    onClick={handleEdit}
                    className="p-2 text-primary bg-primary/20 hover:bg-primary/25 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Edit Course"
                >
                    <PencilSimpleIcon size={18} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 bg-red-100/70 hover:bg-red-200 hover:text-red-600 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Delete Course"
                >
                    <TrashIcon size={18} />
                </button>
            </div>
        </div>
    );
}
