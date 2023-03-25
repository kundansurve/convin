import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import cardType from "../constants";
import Window from "./window";

const Card = ({ card, index, movecard, status }) => {
  const ref = useRef(null);

  const [collectedProps, drop] = useDrop({
    accept: cardType,
    hover(card, monitor) {
      if (!ref.current) return;
      const dragIndex = card.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) return;
      movecard(dragIndex, hoverIndex);
      card.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item:card,
    type:cardType,
    index:index,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [ show, setShow ] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        ref={ref}
        style={{ opacity: isDragging?0:1 ,backgroundImage:"url(https://www.w3schools.com/html/mov_bbb.mp4#t=0.1)"}}
        className={"card"}
        onClick={onOpen}
      >
        <div className={"color-bar"} style={{backgroundColor:status.color}}></div>
        <p className={"card-title"}>{card.name}</p>
        <p className={"card-status"}>{card.icon}</p>
        {/*<video width="100%" controls="controls" preload="metadata">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4#t=0.1" type="video/mp4"/>
  </video>*/}
      </div>
      <Window card={card} onClose={onClose} show={show}/>
    </Fragment>
  );
};

export default Card;