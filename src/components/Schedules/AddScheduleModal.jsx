import { useState, useEffect } from "react";
import { useSchedulesStore } from "../../stores/useSchedulesStore";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import Spinner from "../common/Spinner";

const AddScheduleModal = ({ isOpen, onClose, scheduleType, entityId, selectedDay, initialData }) => {
    const { addPlaceSchedules, addStaffSchedules, isLoading } = useSchedulesStore();
    
    const [formData, setFormData] = useState({
        day: selectedDay || "0",
        startFrom: "8",
        endTo: "9"
    });
    
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (initialData) {
            setFormData({
                day: initialData.day.toString(),
                startFrom: initialData.startFrom.toString(),
                endTo: initialData.endTo.toString()
            });
        } else if (selectedDay) {
            setFormData((prev) => ({ ...prev, day: selectedDay, startFrom: "8", endTo: "9" }));
        }
    }, [initialData, selectedDay]);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (parseInt(formData.startFrom) >= parseInt(formData.endTo)) {
            newErrors.endTo = "End time must be after start time";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting.");
            return;
        }
        
        try {
            const scheduleData = {
                day: parseInt(formData.day),
                startFrom: parseInt(formData.startFrom),
                endTo: parseInt(formData.endTo)
            };
            
            if (scheduleType === "place") {
                await addPlaceSchedules(entityId, [scheduleData]);
            } else {
                await addStaffSchedules(entityId, [scheduleData]);
            }

            toast.success("Schedule added successfully!");
            onClose();

        } catch (error) {
            toast.error(error.response?.data?.detail || "Failed to add schedule.");
        }
    };
    
    if (!isOpen) return null;
    
    const generateHourOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            const period = i >= 12 ? 'PM' : 'AM';
            const hour = i > 12 ? i - 12 : (i === 0 ? 12 : i);
            options.push(
                <option key={i} value={i.toString()}>
                    {`${hour}:00 ${period}`}
                </option>
            );
        }
        return options;
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-y-auto">
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-neutral-700">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-primary-light">
                        Add New Schedule
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-full p-2 cursor-pointer"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Day of the week</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {daysOfWeek.map((day, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'day', value: index.toString() } })}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                                        formData.day === index.toString()
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-600'
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="startFrom" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium text-sm">Start Time</label>
                            <select
                                id="startFrom"
                                name="startFrom"
                                value={formData.startFrom}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-primary-light dark:border-neutral-600 appearance-none cursor-pointer ${
                                    errors.startFrom ? "border-red-500 ring-red-500" : "border-gray-300"
                                }`}
                            >
                                {generateHourOptions(8, 17)}
                            </select>
                            {errors.startFrom && <p className="text-red-500 text-sm mt-2">{errors.startFrom}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="endTo" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium text-sm">End Time</label>
                            <select
                                id="endTo"
                                name="endTo"
                                value={formData.endTo}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 dark:text-primary-light dark:border-neutral-600 appearance-none cursor-pointer ${
                                    errors.endTo ? "border-red-500 ring-red-500" : "border-gray-300"
                                }`}
                            >
                                {generateHourOptions(9, 18)}
                            </select>
                            {errors.endTo && <p className="text-red-500 text-sm mt-2">{errors.endTo}</p>}
                        </div>
                    </div>
                    
                    <div className="flex justify-end items-center pt-5 border-t border-gray-200 dark:border-neutral-700 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-neutral-500 rounded-lg mr-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200 cursor-pointer text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center text-sm cursor-pointer"
                        >
                            {isLoading ? <Spinner size={5} color="text-white" /> : "Add Schedule"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScheduleModal; 