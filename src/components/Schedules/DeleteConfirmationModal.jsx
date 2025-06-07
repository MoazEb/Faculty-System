import { FaTimes } from "react-icons/fa";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, dayName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-600">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-primary-light">
                        Confirm Deletion
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm">
                        Are you sure you want to delete the schedule for <strong>{dayName}</strong>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-neutral-600 rounded-lg mr-2 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal; 