import React from "react";
import MobileCard from "./MobileCard";
import DesktopCard from "./DesktopCard";

const Card = ({ place, placeTypeLabel, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(place);
    };

    const handleDelete = () => {
        onDelete(place);
    };

    return (
        <>
            <MobileCard place={place} placeTypeLabel={placeTypeLabel} handleEdit={handleEdit} handleDelete={handleDelete} />
            <DesktopCard place={place} placeTypeLabel={placeTypeLabel} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
    );
};

export default Card;
