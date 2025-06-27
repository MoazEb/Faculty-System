import { useEffect, useState } from "react";
import Card from "../components/TeachingStaff/Card";
import Spinner from "../components/common/Spinner";
import AddTeachingStaffModal from "../components/TeachingStaff/AddTeachingStaffModal";
import TeachingStaffControls from "../components/TeachingStaff/TeachingStaffControls";
import { useTeachingStaffStore } from "../stores/useTeachingStaffStore";
import DeleteConfirmationModal from "../components/TeachingStaff/DeleteConfirmationModal";
import EditTeachingStaffModal from "../components/TeachingStaff/EditTeachingStaffModal";

export default function ManageTeachingStaff() {
    const { 
        teachingStaff, 
        isLoading, 
        getTeachingStaff, 
        deleteTeachingStaff,
        getStaffTypeLabel,
        filters,
        setFilters 
    } = useTeachingStaffStore();
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.name || "");

    useEffect(() => {
        getTeachingStaff();
    }, [getTeachingStaff]);

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

    const handleEditClick = (staff) => {
        setSelectedStaff(staff);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (staff) => {
        setSelectedStaff(staff);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteStaff = async () => {
        if (selectedStaff) {
            await deleteTeachingStaff([selectedStaff.userName]);
            setIsDeleteModalOpen(false);
            setSelectedStaff(null);
        }
    };

    const handleAddStaff = () => {
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
                Manage Teaching Staff
            </h1>

            <TeachingStaffControls
                onAddStaff={handleAddStaff}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                currentFilters={filters}
            />

            <div className="lg:bg-white lg:dark:bg-secondary-dark lg:shadow-md lg:rounded-lg overflow-hidden">
                <div className="hidden lg:flex items-center py-3 px-4 bg-gray-50 dark:bg-neutral-600 dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 font-semibold text-xs text-gray-600 uppercase tracking-wider">
                    <div className="flex-[0_0_35%]">Staff Member</div>
                    <div className="flex-[0_0_10%] text-center px-1">Gender</div>
                    <div className="flex-[0_0_15%] text-center px-1">Position</div>
                    <div className="flex-[0_0_10%] text-center px-1">Date of Birth</div>
                    <div className="flex-auto text-right pr-2">Actions</div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Spinner size={8} color="text-primary" />
                    </div>
                ) : teachingStaff.length > 0 ? (
                    <div className="flex flex-col gap-4 lg:gap-0">
                        {teachingStaff.map((staff) => (
                            <Card
                                key={staff.userName}
                                staff={staff}
                                staffTypeLabel={getStaffTypeLabel(staff.level)}
                                onEdit={() => handleEditClick(staff)}
                                onDelete={() => handleDeleteClick(staff)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-primary-light">
                        <p>No teaching staff found. Try adding some!</p>
                    </div>
                )}
            </div>

            {isEditModalOpen && selectedStaff && (
                <EditTeachingStaffModal
                    staff={selectedStaff}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedStaff(null);
                    }}
                />
            )}

            {isDeleteModalOpen && selectedStaff && (
                <DeleteConfirmationModal
                    staffName={selectedStaff.fullName}
                    isOpen={isDeleteModalOpen}
                    onConfirm={confirmDeleteStaff}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedStaff(null);
                    }}
                />
            )}
            
            {isAddModalOpen && (
                <AddTeachingStaffModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        getTeachingStaff(); // Refresh the list after adding
                    }}
                    selectedLevel={filters.level}
                    selectedGender={filters.gender}
                />
            )}
        </div>
    );
}
