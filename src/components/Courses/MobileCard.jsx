import React from "react";
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";

export default function MobileCard({ course, handleEdit, handleDelete }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden lg:hidden">
            {/* Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.code}</h3>
                        <span className="text-sm text-gray-500 font-medium">{course.name}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-3">
                        <button
                            onClick={handleEdit}
                            className="p-1.5 text-primary bg-primary/20 hover:bg-primary/25 rounded-lg transition-all duration-200"
                            title="Edit Course"
                        >
                            <PencilSimpleIcon size={16} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1.5 text-red-600 bg-red-100/70 hover:bg-red-200 hover:text-red-600 rounded-lg transition-all duration-200"
                            title="Delete Course"
                        >
                            <TrashIcon size={16} />
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
