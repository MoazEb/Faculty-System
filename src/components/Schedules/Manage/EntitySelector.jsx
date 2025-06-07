const EntitySelector = ({ scheduleType, entities, selectedEntity, handleSelectChange }) => {
    return (
        <div className="w-full sm:w-72 mb-6">
           <label htmlFor="entity-select" className="sr-only">Select {scheduleType}</label>
           <select
                id="entity-select"
                value={selectedEntity ? (scheduleType === 'place' ? selectedEntity.id : selectedEntity.userName) : ''}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-primary-light rounded-lg shadow-sm focus:border-primary focus:ring-primary"
           >
                <option value="" disabled>Select a {scheduleType}</option>
                {entities.map(entity => (
                    <option
                        key={scheduleType === 'place' ? entity.id : entity.userName}
                        value={scheduleType === 'place' ? entity.id : entity.userName}
                        className="py-2"
                    >
                        {scheduleType === 'place' ? `${entity.name} (${entity.type === 0 ? 'Hall' : 'Lab'})` : entity.fullName}
                    </option>
                ))}
           </select>
        </div>
    );
};

export default EntitySelector; 