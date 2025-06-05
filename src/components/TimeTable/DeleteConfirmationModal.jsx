import React from "react";
import Modal from "react-modal";
import Spinner from "../common/Spinner";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, itemName, isDeleting }) => {
    const modalStyles = {
        content: {
            maxWidth: "24rem",
            width: "100%",
            maxHeight: "90vh",
        },
    };

    return (
        <Modal isOpen={show} onRequestClose={onClose} style={modalStyles} contentLabel="Delete Confirmation Modal">
            <h2 className="text-xl font-semibold mb-4 dark:text-primary-light">Confirm Deletion</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete the timetable: "<strong>{itemName}</strong>"? This action cannot be
                undone.
            </p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                    disabled={isDeleting}
                >
                    {isDeleting ? <Spinner /> : "Delete"}
                </button>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;