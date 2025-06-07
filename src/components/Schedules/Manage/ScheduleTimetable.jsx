const ScheduleTimetable = ({ schedules, onSlotClick, formatTime, days, hours }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-600">
                <thead className="bg-gray-50 dark:bg-neutral-600">
                    <tr>
                        <th className="sticky left-0 z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider w-24 bg-gray-50 dark:bg-neutral-600">Time</th>
                        {days.map(day => (
                            <th key={day} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider border-l border-gray-200 dark:border-neutral-500">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-secondary-dark divide-y divide-gray-200 dark:divide-neutral-600">
                    {hours.map(hour => (
                        <tr key={hour} style={{ height: '48px' }}>
                            <td className="sticky left-0 z-10 px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-medium bg-white dark:bg-secondary-dark border-r border-gray-200 dark:border-neutral-600">{formatTime(hour)}</td>
                            {days.map((day, dayIndex) => {
                                const schedule = schedules.find(s => s.day === dayIndex && s.startFrom === hour);
                                const covered = schedules.some(s => s.day === dayIndex && s.startFrom < hour && s.endTo > hour);
                                
                                if(schedule) {
                                    const rowSpan = schedule.endTo - schedule.startFrom;
                                    return (
                                        <td key={`${day}-${hour}`} rowSpan={rowSpan} className="relative p-0 border-l border-gray-200 dark:border-neutral-500 align-top h-full" style={{minWidth: 120, height: `${rowSpan * 48}px`, padding:0}} onClick={() => onSlotClick(day, hour)}>
                                            <div className="h-full w-full flex flex-col items-center justify-center bg-primary/20 border border-primary/50 rounded-lg p-2 text-xs text-primary-dark dark:text-primary-light shadow-sm min-h-0 hover:bg-primary/30 transition-colors duration-150 cursor-pointer">
                                                <span className="font-semibold">{formatTime(schedule.startFrom)} - {formatTime(schedule.endTo)}</span>
                                            </div>
                                        </td>
                                    )
                                }

                                if(covered) return null;

                                return (
                                    <td key={`${day}-${hour}`} className="px-2 py-1 border-l border-gray-200 dark:border-neutral-500 bg-gray-50 dark:bg-neutral-700/30 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700/50 transition-colors duration-150" style={{minWidth: 120}} onClick={() => onSlotClick(day, hour)}>
                                        {/* Empty slot */}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ScheduleTimetable; 