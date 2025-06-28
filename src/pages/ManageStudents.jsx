import { useEffect, useState } from "react";
import Card from "../components/Students/Card";
import Spinner from "../components/common/Spinner";
import AddStudentModal from "../components/Students/AddStudentModal";
import StudentControls from "../components/Students/StudentControls";
import { useStudentsStore } from "../stores/useStudentsStore";
import DeleteConfirmationModal from "../components/Students/DeleteConfirmationModal";
import EditStudentModal from "../components/Students/EditStudentModal";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

export default function ManageStudents() {
    const { students, isLoading, getStudents, deleteStudent: deleteStudentFromStore, filters, setFilters, registerStudentsFromFile, fetchStudentsByLevel } = useStudentsStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        getStudents();
    }, [getStudents]);

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
        setFilters({ name: term });
    };

    const handleFilterChange = (filterName, value) => {
        setFilters({ [filterName]: value });
    };

    const downloadTemplate = () => {
        const wb = XLSX.utils.book_new();
        const headers = ["UserName", "FullName", "Gender", "Level", "DateOfBirth", "Password"];
        const exampleData = ["john.doe", "John Doe", "Male", "1", "2000-01-01", "password123"];
        const ws = XLSX.utils.aoa_to_sheet([headers, exampleData]);
        ws["!cols"] = [
            { wch: 15 },
            { wch: 20 },
            { wch: 10 },
            { wch: 10 },
            { wch: 15 },
            { wch: 15 },
        ];
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, "student_upload_template.xlsx");
    };

    const downloadStudentsByLevel = async (level) => {
        const studentsToDownload = await fetchStudentsByLevel(level);
        if (studentsToDownload.length === 0) {
            toast.warning(`No students found for Level ${level}`);
            return;
        }

        const wb = XLSX.utils.book_new();
        const data = studentsToDownload.map(student => ({
            UserName: student.userName,
            FullName: student.fullName,
            Gender: student.gender,
            Level: student.level,
            DateOfBirth: student.dateOfBirth,
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        ws["!cols"] = [
            { wch: 15 },
            { wch: 20 },
            { wch: 10 },
            { wch: 8 },
            { wch: 12 },
        ];
        XLSX.utils.book_append_sheet(wb, ws, `Level${level}_Students`);
        XLSX.writeFile(wb, `students_level${level}.xlsx`);
        toast.success(`Downloaded students for Level ${level}`);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileType = file.name.split(".").pop().toLowerCase();
        if (!["xlsx", "xls"].includes(fileType)) {
            toast.error("Please upload only Excel files (.xlsx or .xls)");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);

                if (jsonData.length === 0) {
                    toast.warning("No valid student data found in the file.");
                    return;
                }
                
                await registerStudentsFromFile(file);

            } catch (err) {
                toast.error("Failed to parse Excel file.");
                console.error(err);
            }
        };

        reader.onerror = () => {
            toast.error("Error reading Excel file");
        };

        reader.readAsArrayBuffer(file);
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
                currentFilters={filters}
                onDownloadTemplate={downloadTemplate}
                onDownloadStudents={downloadStudentsByLevel}
                onFileUpload={handleFileUpload}
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
                        getStudents();
                    }}
                    selectedLevel={filters.level}
                    selectedGender={filters.gender}
                />
            )}
        </div>
    );
}
