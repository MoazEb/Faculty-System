import React from "react";
import Select from "react-select";

const CustomSelect = ({
    id,
    options,
    value,
    onChange,
    placeholder,
    isDisabled,
    isLoading,
    isMulti = false
}) => {
    const isDarkMode = window.localStorage.getItem('theme') === 'dark';
    
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: isDarkMode ? 'var(--color-secondary-dark)' : 'white',
            borderColor: state.isFocused ? 'var(--color-primary)' : '#4b5563',
            boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary)' : 'none',
            '&:hover': {
                borderColor: 'var(--color-primary)',
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? 'var(--color-primary-dark)' : 'white',
            zIndex: 9999,
        }),
        option: (base, { isDisabled, isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isDisabled ? undefined : isSelected ? 'var(--color-primary)' : isFocused ? 'var(--color-secondary)' : undefined,
            color: isDisabled ? '#9ca3af' : isSelected ? 'white' : isDarkMode ? 'var(--color-primary-light)' : 'var(--color-primary-dark)',
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...base[':active'],
                backgroundColor: !isDisabled && (isSelected ? 'var(--color-primary)' : 'var(--color-secondary)'),
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: isDarkMode ? 'var(--color-primary-light)' : 'var(--color-primary-dark)',
        }),
        input: (provided) => ({
            ...provided,
            color: isDarkMode ? 'var(--color-primary-light)' : 'var(--color-primary-dark)',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: 'var(--color-primary)',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'white',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: 'white',
            ':hover': {
                backgroundColor: 'var(--color-secondary)',
                color: 'white',
            },
        }),
    };

    return (
        <Select
            id={id}
            isMulti={isMulti}
            options={options}
            value={value}
            onChange={onChange}
            className="flex-grow min-w-0 text-primary-light dark:text-primary-light"
            classNamePrefix="react-select"
            placeholder={placeholder}
            isDisabled={isDisabled}
            isLoading={isLoading}
            styles={customStyles}
        />
    );
};

export default CustomSelect; 