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
    const { courses, isLoading, getCourses, deleteCourse: deleteCourseFromStore, filters, setFilters, isThereNextPage, goToPage } = useCoursesStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.name || "");

    const [isDependenciesModalOpen, setIsDependenciesModalOpen] = useState(false);
    const [courseForDependencies, setCourseForDependencies] = useState(null);

    useEffect(() => {
        getCourses();
    }, [getCourses]);

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
        setFilters({ [filterName]: value });
    };

    const handleNextPage = () => {
        goToPage(filters.page + 1);
    };

    const handlePrevPage = () => {
        if (filters.page > 0) {
            goToPage(filters.page - 1);
        }
    };

    const handleOpenManageDependenciesModal = (course) => {
        setCourseForDependencies(course);
        setIsDependenciesModalOpen(true);
    };

    const handleCloseManageDependenciesModal = () => {
        setIsDependenciesModalOpen(false);
        setCourseForDependencies(null);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark">
            <h1 className="text-3xl md:text-4xl mb-6 font-light text-gray-700 dark:text-primary-light text-center md:text-left">
                Manage Courses
            </h1>

            <CourseControls onAddCourse={handleAddCourse} onSearch={handleSearch} onFilterChange={handleFilterChange} currentFilters={filters} searchTerm={searchTerm} />

            <div className="lg:bg-white lg:dark:bg-secondary-dark lg:shadow-md lg:rounded-lg overflow-hidden">
                <div className="hidden lg:flex items-center py-3 px-4 bg-gray-50 dark:bg-neutral-600 dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 font-semibold text-xs text-gray-600 uppercase tracking-wider">
                    <div className="flex-[0_0_30%]">Course</div>
                    <div className="flex-[0_0_10%] text-center px-1">Credits</div>
                    <div className="flex-[0_0_10%] text-center px-1">Lecture Hours</div>
                    <div className="flex-[0_0_10%] text-center px-1">Level</div>
                    <div className="flex-[0_0_10%] text-center px-1">Semester</div>
                    <div className="flex-[0_0_10%] text-center px-1">Type</div>
                    <div className="flex-auto text-right pr-2">Actions</div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Spinner size={8} color="text-primary" />
                    </div>
                ) : courses.length > 0 ? (
                    <div className="flex flex-col gap-4 lg:gap-0">
                        {courses.map((course) => (
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

            {courses.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={handlePrevPage}
                        disabled={filters.page === 0}
                        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-secondary-dark dark:text-primary-light dark:border-gray-500 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-primary-light">Page {filters.page + 1}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={!isThereNextPage}
                        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-secondary-dark dark:text-primary-light dark:border-gray-500 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}

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
                    selectedLevel={filters.level}
                    selectedSemester={filters.semester}
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
