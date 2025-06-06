import React from "react";
import MobileCard from "./MobileCard";
import DesktopCard from "./DesktopCard";

const Card = ({ course, onEdit, onDelete, onManageDependencies }) => {
    const handleEdit = () => {
        onEdit(course);
    };

    const handleDelete = () => {
        onDelete(course);
    };

    const handleManageDependencies = () => {
        onManageDependencies(course);
    };

    return (
        <>
            <MobileCard 
                course={course} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
                handleManageDependencies={handleManageDependencies} 
            />
            <DesktopCard 
                course={course} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
                handleManageDependencies={handleManageDependencies} 
            />
        </>
    );
};

export default Card;
