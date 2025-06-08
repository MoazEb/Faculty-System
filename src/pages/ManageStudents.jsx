import { useEffect, useState } from "react";
import Card from "../components/Students/Card";
import Spinner from "../components/common/Spinner";
import AddStudentModal from "../components/Students/AddStudentModal";
import StudentControls from "../components/Students/StudentControls";
import { useStudentsStore } from "../stores/useStudentsStore";
import DeleteConfirmationModal from "../components/Students/DeleteConfirmationModal";
import EditStudentModal from "../components/Students/EditStudentModal";

export default function ManageStudents() {
    const { students, isLoading, getStudents, deleteStudent: deleteStudentFromStore, filters, setFilters } = useStudentsStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.name || "");

    useEffect(() => {
        getStudents();
    }, [getStudents]);

    useEffect(() => {
        setSearchTerm(filters.name || "");
    }, [filters.name]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm !== filters.name) {
                setFilters({ name: searchTerm });
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, filters.name, setFilters]);

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteStudent = async () => {
        if (selectedStudent) {
            await deleteStudentFromStore([selectedStudent.userName]);
            setIsDeleteModalOpen(false);
            setSelectedStudent(null);
        }
    };

    const handleAddStudent = () => {
        setIsAddModalOpen(true);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters({ [filterName]: value });
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark">
            <h1 className="text-3xl md:text-4xl mb-6 font-light text-gray-700 dark:text-primary-light text-center md:text-left">
                Manage Students
            </h1>

            <StudentControls
                onAddStudent={handleAddStudent}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            <div className="lg:bg-white lg:dark:bg-secondary-dark lg:shadow-md lg:rounded-lg overflow-hidden">
                <div className="hidden lg:flex items-center py-3 px-4 bg-gray-50 dark:bg-neutral-600 dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 font-semibold text-xs text-gray-600 uppercase tracking-wider">
                    <div className="flex-[0_0_35%]">Student</div>
                    <div className="flex-[0_0_10%] text-center px-1">Gender</div>
                    <div className="flex-[0_0_10%] text-center px-1">Level</div>
                    <div className="flex-[0_0_10%] text-center px-1">Date of Birth</div>
                    <div className="flex-auto text-right pr-2">Actions</div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Spinner size={8} color="text-primary" />
                    </div>
                ) : students.length > 0 ? (
                    <div className="flex flex-col gap-4 lg:gap-0">
                        {students.map((student) => (
                            <Card
                                key={student.userName}
                                student={student}
                                onEdit={() => handleEditClick(student)}
                                onDelete={() => handleDeleteClick(student)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-primary-light">
                        <p>No students found. Try adding some!</p>
                    </div>
                )}
            </div>

            {isEditModalOpen && selectedStudent && (
                <EditStudentModal
                    student={selectedStudent}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedStudent(null);
                    }}
                />
            )}

            {isDeleteModalOpen && selectedStudent && (
                <DeleteConfirmationModal
                    studentName={selectedStudent.fullName}
                    isOpen={isDeleteModalOpen}
                    onConfirm={confirmDeleteStudent}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedStudent(null);
                    }}
                />
            )}
            {isAddModalOpen && (
                <AddStudentModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                    }}
                    selectedLevel={filters.level}
                    selectedGender={filters.gender}
                />
            )}
        </div>
    );
}
