import React from "react";
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";

export default function MobileCard({ staff, staffTypeLabel, handleEdit, handleDelete }) {
    return (
        <div className="bg-white dark:bg-secondary-dark rounded-xl border border-gray-200 dark:border-neutral-600 hover:shadow-lg transition-all duration-300 overflow-hidden lg:hidden">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-secondary-dark px-4 py-3 border-b border-gray-100 dark:border-neutral-600">
                <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-light mb-1">
                            {staff.firstName} {staff.lastName}
                        </h3>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 font-medium dark:text-neutral-400">{staff.userName}</span>
                            <span className="text-sm text-primary font-medium dark:text-primary-light">{staffTypeLabel}</span>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-3">
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
            </div>

            {/* Staff Info */}
            <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                    {/* Gender */}
                    <div className="p-2 bg-primary/5 font-medium rounded-lg border border-gray-100 dark:border-neutral-600 dark:bg-neutral-700/30 text-center">
                        <div className="text-lg text-gray-900 dark:text-gray-200">{staff.gender === 0 ? "Male" : "Female"}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Gender</div>
                    </div>
                    {/* Date of Birth */}
                    <div className="p-2 bg-primary/5 font-medium rounded-lg border border-gray-100 dark:border-neutral-600 dark:bg-neutral-700/30 text-center">
                        <div className="text-lg text-gray-900 dark:text-gray-200">{new Date(staff.dateOfBirth).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Date of Birth</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
