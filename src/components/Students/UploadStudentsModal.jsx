import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useStudentsStore } from "../../stores/useStudentsStore";
import Spinner from "../common/Spinner";
import { FiUploadCloud } from "react-icons/fi";

const UploadStudentsModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const { isLoading } = useStudentsStore();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || selectedFile.type === "application/vnd.ms-excel")) {
            setFile(selectedFile);
        } else {
            toast.error("Please select an XLSX or XLS file.");
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || droppedFile.type === "application/vnd.ms-excel")) {
            setFile(droppedFile);
        } else {
            toast.error("Please drop an XLSX or XLS file.");
        }
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }
        try {
            await onUpload(file);
            setFile(null);
            onClose();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    
    const inputId = `file-upload-${React.useId()}`;

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Upload Students Modal">
            <h2 className="text-2xl font-semibold mb-4 dark:text-primary-light">Upload Students</h2>
            <form onSubmit={handleSubmit}>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                        ${isDragging ? "border-primary dark:border-primary" : "border-gray-300 dark:border-neutral-500"}
                        transition-colors duration-200 ease-in-out`}
                >
                    <input
                        id={inputId}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label htmlFor={inputId} className="flex flex-col items-center justify-center cursor-pointer">
                        <FiUploadCloud className={`h-12 w-12 mb-4 ${isDragging ? "text-primary" : "text-gray-400"}`} />
                        <p className="text-lg font-semibold dark:text-primary-light">
                            {file ? file.name : "Drag & drop your file here"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">or</p>
                        <span className="mt-2 text-primary font-medium hover:underline">Browse for a file</span>
                        <p className="text-xs text-gray-400 mt-2">XLSX or XLS files only</p>
                    </label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => { setFile(null); onClose(); }}
                        className="px-4 py-2 text-sm font-medium dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer dark:focus:ring-offset-secondary-dark"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!file || isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-secondary-dark"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Spinner />
                                Uploading...
                            </div>
                        ) : (
                            "Upload"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UploadStudentsModal; 