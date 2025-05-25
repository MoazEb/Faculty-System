import React from "react";
import MobileCard from "./MobileCard";
import DesktopCard from "./DesktopCard";

const Card = ({ course, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(course);
    };

    const handleDelete = () => {
        onDelete(course);
    };

    return (
        <>
            <MobileCard course={course} handleEdit={handleEdit} handleDelete={handleDelete} />
            <DesktopCard course={course} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
    );
};

export default Card;
