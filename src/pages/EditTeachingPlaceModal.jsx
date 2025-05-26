import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useTeachingPlacesStore } from "../stores/useTeachingPlacesStore";
import Spinner from "../components/common/Spinner";
import { CaretDownIcon } from "@phosphor-icons/react";

const EditTeachingPlaceModal = ({ place, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        capacity: 0,
        type: 0, // Default to Hall
    });

    const { updateTeachingPlace, isLoading } = useTeachingPlacesStore();

    useEffect(() => {
        if (place) {
            setFormData({
                name: place.name || "",
                capacity: place.capacity || 0,
                type: typeof place.type === "number" ? place.type : 0,
            });
        }
    }, [place]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "type" ? parseInt(value, 10) : 
                    name === "capacity" ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || formData.capacity <= 0) {
            toast.error("Please fill all required fields with valid values.");
            return;
        }
        try {
            await updateTeachingPlace(place.id, formData);
            onClose();
        } catch (error) {
            console.error("Error updating teaching place:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Teaching Place Modal">
            <h2 className="text-2xl font-semibold mb-4 dark:text-primary-light">Edit Teaching Place</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ex: H109"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary-dark dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Type
                    </label>
                    <div className="relative w-full">
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full pl-4 pr-8 py-2 border border-gray-300 dark:border-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none cursor-pointer dark:text-primary-light dark:bg-secondary-dark"
                            required
                        >
                            <option value={0}>Hall</option>
                            <option value={1}>Lab</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <CaretDownIcon size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="capacity" className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Capacity
                    </label>
                    <input
                        type="number"
                        name="capacity"
                        id="capacity"
                        min="1"
                        placeholder="Ex: 150"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary-dark dark:border-neutral-500 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                        required
                    />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer dark:focus:ring-offset-secondary-dark"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer dark:focus:ring-offset-secondary-dark"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Spinner />
                                Updating...
                            </div>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditTeachingPlaceModal;
