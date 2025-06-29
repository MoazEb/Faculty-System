import { useEffect, useState } from "react";
import Card from "./Card";
import Spinner from "../components/common/Spinner";
import AddTeachingPlaceModal from "./AddTeachingPlaceModal";
import TeachingPlacesControls from "./TeachingPlacesControls";
import { useTeachingPlacesStore } from "../stores/useTeachingPlacesStore";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditTeachingPlaceModal from "./EditTeachingPlaceModal";

export default function ManageTeachingPlaces() {
    const { 
        teachingPlaces, 
        isLoading, 
        getTeachingPlaces, 
        deleteTeachingPlace, 
        getPlaceTypeLabel,
        filters,
        setFilters,
        isThereNextPage,
        goToPage
    } = useTeachingPlacesStore();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.name || "");

    useEffect(() => {
        getTeachingPlaces();
    }, [getTeachingPlaces]);

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

    const handleEditClick = (place) => {
        setSelectedPlace(place);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (place) => {
        setSelectedPlace(place);
        setIsDeleteModalOpen(true);
    };

    const confirmDeletePlace = async () => {
        if (selectedPlace) {
            await deleteTeachingPlace(selectedPlace.id);
            setIsDeleteModalOpen(false);
            setSelectedPlace(null);
        }
    };

    const handleAddPlace = () => {
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

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark">
            <h1 className="text-3xl md:text-4xl mb-6 font-light text-gray-700 dark:text-primary-light text-center md:text-left">
                Manage Teaching Places
            </h1>

            <TeachingPlacesControls
                onAddPlace={handleAddPlace}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            <div className="lg:bg-white lg:dark:bg-secondary-dark lg:shadow-md lg:rounded-lg overflow-hidden">
                <div className="hidden lg:flex items-center py-3 px-4 bg-gray-50 dark:bg-neutral-600 dark:text-primary-light border-b border-gray-200 dark:border-neutral-600 font-semibold text-xs text-gray-600 uppercase tracking-wider">
                    <div className="flex-[0_0_35%]">Name</div>
                    <div className="flex-[0_0_15%] text-center px-1">Type</div>
                    <div className="flex-[0_0_15%] text-center px-1">Capacity</div>
                    <div className="flex-auto text-right pr-2">Actions</div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <Spinner size={8} color="text-primary" />
                    </div>
                ) : teachingPlaces.length > 0 ? (
                    <div className="flex flex-col gap-4 lg:gap-0">
                        {teachingPlaces.map((place) => (
                            <Card
                                key={place.id}
                                place={place}
                                placeTypeLabel={getPlaceTypeLabel(place.type)}
                                onEdit={() => handleEditClick(place)}
                                onDelete={() => handleDeleteClick(place)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-primary-light">
                        <p>No teaching places found. Try adding some!</p>
                    </div>
                )}
            </div>

            {teachingPlaces.length > 0 && (
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

            {isEditModalOpen && selectedPlace && (
                <EditTeachingPlaceModal
                    place={selectedPlace}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedPlace(null);
                    }}
                />
            )}

            {isDeleteModalOpen && selectedPlace && (
                <DeleteConfirmationModal
                    placeName={selectedPlace.name}
                    isOpen={isDeleteModalOpen}
                    onConfirm={confirmDeletePlace}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedPlace(null);
                    }}
                />
            )}
            {isAddModalOpen && (
                <AddTeachingPlaceModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                    }}
                    selectedType={filters.type}
                />
            )}
        </div>
    );
}
