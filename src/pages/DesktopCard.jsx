import React from "react";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

// Teaching place data structure:
// {
//   "id": 5,
//   "name": "H109",
//   "capacity": 150,
//   "type": 0  // 0 = Hall, 1 = Lab
// }

export default function DesktopCard({ place, placeTypeLabel, handleEdit, handleDelete }) {
    return (
        <div className="hidden lg:flex items-center py-4 px-6 bg-white dark:bg-secondary-dark dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 hover:bg-primary/5 dark:hover:bg-primary/20 transition-colors duration-150 group">
            {/* Column 1: Place Name */}
            <div className="flex-[0_0_35%] min-w-0 flex items-center pr-4">
                <div className="min-w-0 w-full">
                    <div
                        className="font-semibold text-sm text-gray-800 dark:text-primary-light group-hover:text-primary transition-colors truncate"
                        title={place.name}
                    >
                        {place.name}
                    </div>
                    {/* <div className="text-xs text-gray-500 dark:text-gray-300 truncate">ID: {place.id}</div> */}
                </div>
            </div>

            {/* Column 2: Type */}
            <div className="flex-[0_0_15%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{placeTypeLabel}</div>
                </div>
            </div>

            {/* Column 3: Capacity */}
            <div className="flex-[0_0_15%] min-w-0 px-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{place.capacity} seats</div>
                </div>
            </div>

            {/* Column 4: Actions */}
            <div className="flex-auto min-w-0 flex justify-end items-center gap-2 pl-4">
                <button
                    onClick={handleEdit}
                    className="p-2 text-primary dark:text-primary-light/90 dark:hover:bg-gray-100/15 bg-primary/20 dark:bg-gray-100/5 hover:bg-primary/25 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Edit Teaching Place"
                >
                    <PencilSimpleIcon size={18} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 bg-red-100/70 hover:bg-red-200 dark:bg-gray-100/5 dark:hover:bg-gray-100/20 hover:text-red-600 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Delete Teaching Place"
                >
                    <TrashIcon size={18} />
                </button>
            </div>
        </div>
    );
}
