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
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: 'var(--color-secondary-dark)',
            borderColor: state.isFocused ? 'var(--color-primary)' : '#4b5563',
            boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary)' : 'none',
            '&:hover': {
                borderColor: 'var(--color-primary)',
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'var(--color-primary-dark)',
            zIndex: 9999,
        }),
        option: (base, { isDisabled, isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isDisabled ? undefined : isSelected ? 'var(--color-primary)' : isFocused ? 'var(--color-secondary)' : undefined,
            color: isDisabled ? '#9ca3af' : isSelected ? 'white' : 'var(--color-primary-light)',
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...base[':active'],
                backgroundColor: !isDisabled && (isSelected ? 'var(--color-primary)' : 'var(--color-secondary)'),
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--color-primary-light)',
        }),
        input: (provided) => ({
            ...provided,
            color: 'var(--color-primary-light)',
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