import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { useTimetableStore } from "../../stores/useTimetableStore";
import Spinner from '../common/Spinner';

const SearchSection = () => {
    const {
        staffList,
        placesList,
        staffSearchResults,
        placesSearchResults,
        findValidPlacesForStaff,
        findValidStaffForPlace,
        isSearching,
    } = useTimetableStore();

    const [selectedStaffUsername, setSelectedStaffUsername] = useState('');
    const [selectedPlaceName, setSelectedPlaceName] = useState('');
    const [requiredHours, setRequiredHours] = useState(1);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleStaffSearch = async () => {
        if (!selectedStaffUsername || !requiredHours) {
            toast.error("Please select staff and enter required hours");
            return;
        }
        await findValidPlacesForStaff(selectedStaffUsername, requiredHours);
        setShowSearchResults(true);
    };

    const handlePlaceSearch = async () => {
        if (!selectedPlaceName || !requiredHours) {
            toast.error("Please select place and enter required hours");
            return;
        }
        await findValidStaffForPlace(selectedPlaceName, requiredHours);
        setShowSearchResults(true);
    };

    // Check if search results are empty
    const isEmptyResults = (results) => {
        if (!results) return true;
        return Object.keys(results).length === 0;
    };

    useEffect(() => {
        console.log("staffSearchResults", staffSearchResults);
        console.log("placesSearchResults", placesSearchResults);
    }, [staffSearchResults, placesSearchResults]);

    return (
        <>
            {/* Search form */}
            <div className="my-6 p-4 bg-white rounded-lg shadow dark:bg-secondary-dark">
                <h3 className="text-lg font-semibold mb-4 dark:text-primary-light">Search Common Free Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Staff Member:</label>
                        <select
                            value={selectedStaffUsername}
                            onChange={(e) => setSelectedStaffUsername(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Staff</option>
                            {staffList.map((staff) => (
                                <option key={staff} value={staff}>{staff}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Place:</label>
                        <select
                            value={selectedPlaceName}
                            onChange={(e) => setSelectedPlaceName(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Place</option>
                            {placesList.map((place) => (
                                <option key={place} value={place}>{place}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Required Hours:</label>
                        <input
                            type="number"
                            min="1"
                            max="8"
                            value={requiredHours}
                            onChange={(e) => setRequiredHours(parseInt(e.target.value))}
                            className="w-full p-2 border rounded dark:bg-secondary-dark dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                    <button
                        onClick={handleStaffSearch}
                        disabled={!selectedStaffUsername || !requiredHours || isSearching}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary disabled:bg-gray-400 disabled:dark:bg-neutral-700 cursor-pointer disabled:cursor-not-allowed flex items-center"
                    >
                        {isSearching && <Spinner color="text-white" size="4" />}
                        <span className="ml-2">Search Places for Staff</span>
                    </button>
                    <button
                        onClick={handlePlaceSearch}
                        disabled={!selectedPlaceName || !requiredHours || isSearching}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary disabled:bg-gray-400 disabled:dark:bg-neutral-700 cursor-pointer disabled:cursor-not-allowed flex items-center"
                    >
                        {isSearching && <Spinner color="text-white" size="4" />}
                        <span className="ml-2">Search Staff for Place</span>
                    </button>
                </div>
            </div>

            {/* Search results display */}
            {showSearchResults && (staffSearchResults || placesSearchResults) && (
                <div className="my-6 p-4 bg-white rounded-lg shadow dark:bg-secondary-dark">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold dark:text-primary-light">Search Results</h3>
                        <button 
                            onClick={() => setShowSearchResults(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Close
                        </button>
                    </div>
                    
                    {placesSearchResults && (
                        <div>
                            <h4 className="font-medium mb-2 dark:text-primary-light">Valid Places for Staff</h4>
                            {isEmptyResults(placesSearchResults) ? (
                                <p className="text-gray-600 italic dark:text-gray-400">No available places found for the selected criteria.</p>
                            ) : (
                                Object.entries(placesSearchResults).map(([day, places]) => (
                                    <div key={day} className="mb-3">
                                        <h5 className="font-medium dark:text-gray-300">{day}</h5>
                                        <ul className="list-disc pl-5 dark:text-gray-300">
                                            {places.map((place, index) => (
                                                <li key={index} className="mb-2">
                                                    {place.name} (Capacity: {place.capacity})
                                                    <ul className="list-none pl-3">
                                                        {place.freeHours.map((hour, idx) => (
                                                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                                                {hour.startFrom}:00 - {hour.endTo}:00
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    
                    {staffSearchResults && (
                        <div>
                            <h4 className="font-medium mb-2 dark:text-primary-light mt-4">Valid Staff for Place</h4>
                            {isEmptyResults(staffSearchResults) ? (
                                <p className="text-gray-600 italic dark:text-gray-400">No available staff found for the selected criteria.</p>
                            ) : (
                                Object.entries(staffSearchResults).map(([day, staffMembers]) => (
                                    <div key={day} className="mb-3">
                                        <h5 className="font-medium dark:text-gray-300">{day}</h5>
                                        <ul className="list-disc pl-5 dark:text-gray-300">
                                            {staffMembers.map((staff, index) => (
                                                <li key={index} className="mb-2">
                                                    {staff.fullName}
                                                    <ul className="list-none pl-3">
                                                        {staff.freeHours.map((hour, idx) => (
                                                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                                                {hour.startFrom}:00 - {hour.endTo}:00
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchSection; 