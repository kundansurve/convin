import React from "react";
import { useDrop } from "react-dnd";
import cardType from "./../constants";
import { buckets } from "../data";

const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: cardType,
        canDrop: (card, monitor) => {
            const statusIndex = buckets.findIndex(si => si.status === status);
            return [...Array(buckets.length).keys()].includes(statusIndex);
        },
        drop: (card, monitor) => {
            onDrop(card, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;
