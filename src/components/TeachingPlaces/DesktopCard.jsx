import React from "react";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

// "firstName": "Ahmed",
// "lastName": "Ali",
// "userName": "ahmed.ali.309381",
// "fullName": "Ahmed Ali",
// "gender": 0,
// "role": 1,
// "level": 6 or 7, // 6 = Teaching Assistant, 7 = Teaching Lecturer
// "dateOfBirth": "1990-03-02"

export default function DesktopCard({ staff, staffTypeLabel, handleEdit, handleDelete }) {
    return (
        <div className="hidden lg:flex items-center py-4 px-6 bg-white dark:bg-secondary-dark dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 hover:bg-primary/5 dark:hover:bg-primary/20  transition-colors duration-150 group">
            {/* Column 1: Staff Name & Username */}
            <div className="flex-[0_0_35%] min-w-0 flex items-center pr-4 ">
                <div className="min-w-0 w-full">
                    <div
                        className="font-semibold text-sm text-gray-800 dark:text-primary-light group-hover:text-primary transition-colors truncate"
                        title={staff.fullName}
                    >
                        {staff.firstName} {staff.lastName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 truncate">{staff.userName}</div>
                </div>
            </div>

            {/* Column 2: Gender */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {staff.gender === 0 ? "Male" : "Female"}
                    </div>
                </div>
            </div>

            {/* Column 3: Position */}
            <div className="flex-[0_0_15%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{staffTypeLabel}</div>
                </div>
            </div>

            {/* Column 4: Date of Birth */}
            <div className="flex-[0_0_10%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {new Date(staff.dateOfBirth).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Column 5: Actions */}
            <div className="flex-auto min-w-0 flex justify-end items-center gap-2 pl-4">
                <button
                    onClick={handleEdit}
                    className="p-2 text-primary dark:text-primary-light/90 dark:hover:bg-gray-100/15 bg-primary/20 dark:bg-gray-100/5 hover:bg-primary/25 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Edit Staff Member"
                >
                    <PencilSimpleIcon size={18} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 bg-red-100/70 hover:bg-red-200 dark:bg-gray-100/5 dark:hover:bg-gray-100/20 hover:text-red-600 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Delete Staff Member"
                >
                    <TrashIcon size={18} />
                </button>
            </div>
        </div>
    );
}
