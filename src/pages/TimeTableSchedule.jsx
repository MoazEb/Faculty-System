import { useEffect } from "react";
import useMyScheduleStore from "../stores/useMyScheduleStore";
import TimetableGrid from "../components/TimeTable/TimetableGrid";
import Spinner from "../components/common/Spinner";
import { PrinterIcon } from "@phosphor-icons/react";

export default function TimeTableSchedule() {
    const { schedule, isLoading, error, fetchSchedule } = useMyScheduleStore();

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-primary-dark">
                <div className="flex items-center justify-center mb-4">
                    <Spinner color="text-primary" size="12" />
                </div>
                <p className="text-lg text-gray-700 dark:text-primary-light">
                    Loading Your Schedule...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-primary-dark">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

    if (!schedule) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-primary-dark">
                <p className="text-lg text-gray-700 dark:text-primary-light">
                    No schedule data available.
                </p>
            </div>
        );
    }

    const timetableData = {
        levelsTables: {
            mySchedule: schedule,
        },
    };

    const hours = Array.from({ length: 10 }, (_, i) => i + 8);
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark print:p-0">
            <div className="flex justify-between items-center mb-4 print:hidden">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Weekly Schedule</h1>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <PrinterIcon size={20} />
                    <span>Print</span>
                </button>
            </div>
            <div id="timetable-to-print" className="overflow-auto print:overflow-visible max-w-full border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-secondary-dark print:border-none print:shadow-none">
                <TimetableGrid
                    selectedLevel={"mySchedule"}
                    timeTableData={timetableData}
                    hours={hours}
                    days={days}
                    handleCellClick={() => {}}
                    handleDeleteCourse={() => {}}
                    isEditable={false}
                />
            </div>
        </div>
    );
}
