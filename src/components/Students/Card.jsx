import React from "react";
import MobileCard from "./MobileCard";
import DesktopCard from "./DesktopCard";

const Card = ({ student, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(student);
    };

    const handleDelete = () => {
        onDelete(student);
    };

    return (
        <>
            <MobileCard student={student} handleEdit={handleEdit} handleDelete={handleDelete} />
            <DesktopCard student={student} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
    );
};

export default Card;
