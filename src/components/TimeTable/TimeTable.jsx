import React, { useEffect } from "react";
import { useTimetableStore } from "../../stores/useTimetableStore";
import TimetableView from "./TimetableView";
import TimeTableHeader from "./TimeTableHeader";
import SearchSection from "./SearchSection";
import Spinner from "../common/Spinner";

const TimeTable = () => {
    const {
        isConnected,
        connect,
        timeTableData,
        isLoading,
    } = useTimetableStore();

    useEffect(() => {
        if (!isConnected) {
            connect();
        }
    }, [connect, isConnected]);

    return (
        <div className="p-4 md:p-6 lg:p-8 dark:bg-primary-dark">

            {isLoading && (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-primary-dark">
                    <div className="flex items-center justify-center mb-4">
                        <Spinner color="text-primary" size="12"/>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-primary-light">Loading Data...</p>
                    {/* <p className="text-sm text-gray-500">Please wait while we connect and fetch initial data.</p> */}
                </div>
            )}

            <TimeTableHeader/>

            <main>
                {!isLoading && timeTableData && (
                     <TimetableView />
                )}
            </main>

            {timeTableData && <SearchSection />}
        </div>
    );
};

export default TimeTable;
