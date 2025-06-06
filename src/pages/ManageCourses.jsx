import { useEffect, useState } from "react";
import { useCoursesStore } from "../stores/useCoursesStore";
import Card from "../components/Courses/Card";
import EditCourseModal from "../components/Courses/EditCourseModal";
import DeleteConfirmationModal from "../components/Courses/DeleteConfirmationModal";
import Spinner from "../components/common/Spinner";
import AddCourseModal from "../components/Courses/AddCourseModal";
import CourseControls from "../components/Courses/CourseControls";
import ManageDependenciesModal from "../components/Courses/ManageDependenciesModal";

const ManageCourses = () => {
    const { courses, isLoading, getCourses, deleteCourse: deleteCourseFromStore } = useCoursesStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({ level: "", semester: "" });

    const [isDependenciesModalOpen, setIsDependenciesModalOpen] = useState(false);
    const [courseForDependencies, setCourseForDependencies] = useState(null);

    useEffect(() => {
        getCourses();
    }, []);

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (course) => {
        setSelectedCourse(course);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteCourse = async () => {
        if (selectedCourse) {
            await deleteCourseFromStore(selectedCourse.id);
            setIsDeleteModalOpen(false);
            setSelectedCourse(null);
        }
    };

    const handleAddCourse = () => {
        setIsAddModalOpen(true);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        filterName === "level" && setSelectedLevel(value);
        filterName === "level" && value !== "" && getCourses(page, value);
        filterName === "semester" && setSelectedSemester(value);
    };

    const handleOpenManageDependenciesModal = (course) => {
        setCourseForDependencies(course);
        setIsDependenciesModalOpen(true);
    };

    const handleCloseManageDependenciesModal = () => {
        setIsDependenciesModalOpen(false);
        setCourseForDependencies(null);
    };

    const filteredCourses = courses.filter((course) => {
        return (
            (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.code && course.code.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (filters.level ? course.level === parseInt(filters.level) : true) &&
            (filters.semester ? course.semester === parseInt(filters.semester) : true)
        );
    });

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark">
            <h1 className="text-3xl md:text-4xl mb-6 font-light text-gray-700 dark:text-primary-light text-center md:text-left">
                Manage Courses
            </h1>

            <CourseControls onAddCourse={handleAddCourse} onSearch={handleSearch} onFilterChange={handleFilterChange} />

            <div className="lg:bg-white lg:dark:bg-secondary-dark lg:shadow-md lg:rounded-lg overflow-hidden">
                <div className="hidden lg:flex items-center py-3 px-4 bg-gray-50 dark:bg-neutral-600 dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 font-semibold text-xs text-gray-600 uppercase tracking-wider">
                    <div className="flex-[0_0_35%]">Course</div>
                    <div className="flex-[0_0_10%] text-center px-1">Credits</div>
                    <div className="flex-[0_0_10%] text-center px-1">Lecture Hours</div>
                    <div className="flex-[0_0_10%] text-center px-1">Level</div>
                    <div className="flex-[0_0_10%] text-center px-1">Semester</div>
                    <div className="flex-auto text-right pr-2">Actions</div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Spinner size={8} color="text-primary" />
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="flex flex-col gap-4 lg:gap-0">
                        {filteredCourses.map((course) => (
                            <Card
                                key={course.id}
                                course={course}
                                onEdit={() => handleEditClick(course)}
                                onDelete={() => handleDeleteClick(course)}
                                onManageDependencies={() => handleOpenManageDependenciesModal(course)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-primary-light">
                        <p>No courses found. Try adding some!</p>
                    </div>
                )}
            </div>

            {isEditModalOpen && selectedCourse && (
                <EditCourseModal
                    course={selectedCourse}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedCourse(null);
                    }}
                />
            )}

            {isDeleteModalOpen && selectedCourse && (
                <DeleteConfirmationModal
                    courseName={selectedCourse.name}
                    isOpen={isDeleteModalOpen}
                    onConfirm={confirmDeleteCourse}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedCourse(null);
                    }}
                />
            )}
            {isAddModalOpen && (
                <AddCourseModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                    }}
                    selectedLevel={selectedLevel}
                    selectedSemester={selectedSemester}
                />
            )}

            {isDependenciesModalOpen && courseForDependencies && (
                <ManageDependenciesModal
                    course={courseForDependencies}
                    isOpen={isDependenciesModalOpen}
                    onClose={handleCloseManageDependenciesModal}
                />
            )}
        </div>
    );
};
export default ManageCourses;
