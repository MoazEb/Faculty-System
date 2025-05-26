import React from "react";
import MobileCard from "./MobileCard";
import DesktopCard from "./DesktopCard";

const Card = ({ staff, staffTypeLabel, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(staff);
    };

    const handleDelete = () => {
        onDelete(staff);
    };

    return (
        <>
            <MobileCard staff={staff} staffTypeLabel={staffTypeLabel} handleEdit={handleEdit} handleDelete={handleDelete} />
            <DesktopCard staff={staff} staffTypeLabel={staffTypeLabel} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
    );
};

export default Card;
