import { FiPlus } from 'react-icons/fi';

const SchedulePageHeader = ({ scheduleType, setScheduleType, onAddClick, isAddDisabled }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={onAddClick}
                    disabled={isAddDisabled}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <FiPlus className="mr-2 h-5 w-5" />
                    Add Schedule
                </button>
                <div className="flex gap-2 p-1 bg-gray-200 dark:bg-neutral-700 rounded-lg">
                    <button
                        onClick={() => setScheduleType("place")}
                        className={`px-3 py-1 rounded-md transition-colors text-sm font-medium cursor-pointer ${
                            scheduleType === "place"
                                ? "bg-white dark:bg-neutral-800 text-gray-800 dark:text-white shadow"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-600/50"
                        }`}
                    >
                        Places
                    </button>
                    <button
                        onClick={() => setScheduleType("staff")}
                        className={`px-3 py-1 rounded-md transition-colors text-sm font-medium cursor-pointer ${
                            scheduleType === "staff"
                                ? "bg-white dark:bg-neutral-800 text-gray-800 dark:text-white shadow"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-600/50"
                        }`}
                    >
                        Staff
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SchedulePageHeader; 