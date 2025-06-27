import { useEffect, useState } from "react";
import { useSchedulesStore } from "../stores/useSchedulesStore";
import { useTeachingPlacesStore } from "../stores/useTeachingPlacesStore";
import { useTeachingStaffStore } from "../stores/useTeachingStaffStore";
import EditScheduleModal from "../components/Schedules/EditScheduleModal";
import DeleteConfirmationModal from "../components/Schedules/DeleteConfirmationModal";
import Spinner from "../components/common/Spinner";
import AddScheduleModal from "../components/Schedules/AddScheduleModal";
import toast from "react-hot-toast";
import SchedulePageHeader from "../components/Schedules/Manage/SchedulePageHeader";
import EntitySelector from "../components/Schedules/Manage/EntitySelector";
import ScheduleTimetable from "../components/Schedules/Manage/ScheduleTimetable";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

const ManageSchedules = () => {
    const { 
        placeSchedules, 
        staffSchedules, 
        isLoading, 
        getPlaceSchedules, 
        getStaffSchedules, 
        deletePlaceSchedules, 
        deleteStaffSchedules,
    } = useSchedulesStore();
    const { teachingPlaces, getTeachingPlaces, isLoading: isLoadingPlaces } = useTeachingPlacesStore();
    const { teachingStaff, getAllTeachingStaff, isLoading: isLoadingStaff } = useTeachingStaffStore();
    
    const [scheduleType, setScheduleType] = useState("place"); // "place" or "staff"
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const schedules = scheduleType === "place" ? placeSchedules : staffSchedules;
    const entities = scheduleType === "place" ? teachingPlaces : teachingStaff;

    useEffect(() => {
        getTeachingPlaces();
        getAllTeachingStaff();
    }, [getTeachingPlaces, getAllTeachingStaff]);

    useEffect(() => {
        if (selectedEntity) {
            if (scheduleType === "place") {
                selectedEntity.id && getPlaceSchedules(selectedEntity.id);
            } else {
                selectedEntity.userName && getStaffSchedules(selectedEntity.userName);
            }
        }
    }, [selectedEntity, scheduleType, getPlaceSchedules, getStaffSchedules]);

    useEffect(() => {
        setSelectedEntity(null);
    }, [scheduleType]);

    useEffect(() => {
        if (!selectedEntity && entities.length > 0) {
            setSelectedEntity(entities[0]);
        }
    }, [entities, selectedEntity]);

    const handleEditClick = (schedule) => {
        setSelectedSchedule(schedule);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (schedule) => {
        setSelectedSchedule(schedule);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteSchedule = async () => {
        if (selectedSchedule) {
            try {
                const entityId = scheduleType === 'place' ? selectedEntity.id : selectedEntity.userName;
                if (scheduleType === "place") {
                    await deletePlaceSchedules(entityId, [selectedSchedule.id]);
                } else {
                    await deleteStaffSchedules(entityId, [selectedSchedule.id]);
                }
                toast.success("Schedule deleted successfully!");
                setIsDeleteModalOpen(false);
                setSelectedSchedule(null);
            } catch (error) {
                toast.error("Error deleting schedule.");
            }
        }
    };

    const handleSlotClick = (day, hour) => {
        const clickedDay = DAYS.find(d => d === day);
        if(!clickedDay) return;

        const existingSchedule = schedules.find(
          s => s.day === DAYS.indexOf(clickedDay) && s.startFrom <= hour && s.endTo > hour
        );
    
        if (existingSchedule) {
            handleEditClick(existingSchedule);
        } else {
            const newSchedule = {
                day: DAYS.indexOf(clickedDay),
                startFrom: hour,
                endTo: hour + 1,
            };
            setSelectedSchedule(newSchedule);
            setIsAddModalOpen(true);
        }
    };

    const handleAddScheduleClick = () => {
        const newSchedule = {
            day: 0, // Default to Sunday
            startFrom: 8, // Default to 8 AM
            endTo: 9,     // Default to 9 AM
        };
        setSelectedSchedule(newSchedule);
        setIsAddModalOpen(true);
    };

    const formatTime = (hour) => {
        const h = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${h}:00 ${ampm}`;
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        const entity = entities.find(e => 
            (scheduleType === 'place' ? e.id.toString() : e.userName) === selectedValue
        );
        setSelectedEntity(entity);
    };

    const getDayName = (dayNumber) => {
        return DAYS[dayNumber] || '';
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark min-h-screen">
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl mb-6 font-light text-gray-700 dark:text-primary-light text-center md:text-left">
                    Manage Schedules
                </h1>
            </div>
            <div className="bg-white dark:bg-secondary-dark shadow rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <EntitySelector
                     scheduleType={scheduleType}
                       entities={entities}
                       selectedEntity={selectedEntity}
                     handleSelectChange={handleSelectChange}
                    />
                    <SchedulePageHeader 
                    scheduleType={scheduleType}
                    setScheduleType={setScheduleType}
                    onAddClick={handleAddScheduleClick}
                    isAddDisabled={!selectedEntity}
                   />  
                </div>
                
                {isLoading || isLoadingPlaces || isLoadingStaff ? (
                     <div className="flex items-center justify-center h-64">
                        <Spinner size={8} color="text-primary" />
                    </div>
                ) : selectedEntity ? (
                    <ScheduleTimetable
                        schedules={schedules}
                        onSlotClick={handleSlotClick}
                        formatTime={formatTime}
                        days={DAYS}
                        hours={HOURS}
                    />
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-primary-light">
                        Please select a {scheduleType} to view schedules.
                    </div>
                )}
            </div>

            {isEditModalOpen && selectedSchedule && (
                <EditScheduleModal
                    schedule={selectedSchedule}
                    scheduleType={scheduleType}
                    entityId={selectedEntity ? (scheduleType === 'place' ? selectedEntity.id : selectedEntity.userName) : null}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedSchedule(null);
                    }}
                    onDelete={(scheduleToDelete) => {
                        setIsEditModalOpen(false);
                        handleDeleteClick(scheduleToDelete);
                    }}
                />
            )}
            
            {isDeleteModalOpen && selectedSchedule && (
                <DeleteConfirmationModal
                    dayName={getDayName(selectedSchedule.day)}
                    isOpen={isDeleteModalOpen}
                    onConfirm={confirmDeleteSchedule}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setIsEditModalOpen(true);
                        // setSelectedSchedule(null);
                    }}
                />
            )}
            
            {isAddModalOpen && selectedSchedule && (
                <AddScheduleModal
                    isOpen={isAddModalOpen}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setSelectedSchedule(null)
                    }}
                    scheduleType={scheduleType}
                    entityId={selectedEntity ? (scheduleType === 'place' ? selectedEntity.id : selectedEntity.userName) : null}
                    selectedDay={selectedSchedule.day.toString()}
                    initialData={selectedSchedule}
                />
            )}
        </div>
    );
};

export default ManageSchedules; 