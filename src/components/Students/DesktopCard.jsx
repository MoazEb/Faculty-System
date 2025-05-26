import React from "react";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

// "firstName": "Ahmed",
// "lastName": "Ali",
// "userName": "ahmed.ali.309381",
// "fullName": "Ahmed Ali",
// "gender": 0,
// "role": 2,
// "level": 1,
// "dateOfBirth": "2008-03-02"

export default function DesktopCard({ student, handleEdit, handleDelete }) {
    return (
        <div className="hidden lg:flex items-center py-4 px-6 bg-white dark:bg-secondary-dark dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 hover:bg-primary/5 dark:hover:bg-primary/20  transition-colors duration-150 group">
            {/* Column 1: Student Name & Username */}
            <div className="flex-[0_0_35%] min-w-0 flex items-center pr-4 ">
                <div className="min-w-0 w-full">
                    <div
                        className="font-semibold text-sm text-gray-800 dark:text-primary-light group-hover:text-primary transition-colors truncate"
                        title={student.fullName}
                    >
                        {student.firstName} {student.lastName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 truncate">{student.userName}</div>
                </div>
            </div>

            {/* Column 2: Gender */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {student.gender === 0 ? "Male" : "Female"}
                    </div>
                </div>
            </div>

            {/* Column 3: Level */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Level {student.level}</div>
                </div>
            </div>

            {/* Column 4: Date of Birth */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {new Date(student.dateOfBirth).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Column 5: Actions */}
            <div className="flex-auto min-w-0 flex justify-end items-center gap-2 pl-4">
                <button
                    onClick={handleEdit}
                    className="p-2 text-primary dark:text-primary-light/90 dark:hover:bg-gray-100/15 bg-primary/20 dark:bg-gray-100/5 hover:bg-primary/25 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Edit Student"
                >
                    <PencilSimpleIcon size={18} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 bg-red-100/70 hover:bg-red-200 dark:bg-gray-100/5 dark:hover:bg-gray-100/20 hover:text-red-600 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Delete Student"
                >
                    <TrashIcon size={18} />
                </button>
            </div>
        </div>
    );
}
