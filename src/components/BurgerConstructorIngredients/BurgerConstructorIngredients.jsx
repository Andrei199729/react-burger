import React from "react";
import styles from "./BurgerConstructorIngredients.module.css";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrop, useDrag } from "react-dnd";

function BurgerConstructorIngredients(props) {
  const id = props.id;
  const originalIndex = props.findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          props.moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, props.moveCard]
  );
  const [{ isHover }, drop] = useDrop(
    () => ({
      accept: "card",
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = props.findCard(id);
          props.moveCard(draggedId, overIndex);
        }
      },
      collect: (monitor) => ({
        isHover: monitor.isOver(),
      }),
    }),
    [props.findCard, props.moveCard]
  );
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      className={`${styles.icon} mr-2`}
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      <div className={`mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        key={props.id}
        text={props.name}
        price={props.price}
        thumbnail={props.imageMobile}
        handleClose={(e) => props.onDelete(props.main)}
        extraClass={`${isHover ? styles.onHover : ""}`}
      />
    </div>
  );
}

BurgerConstructorIngredients.propTypes = {
  id: PropTypes.string.isRequired,
  findCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageMobile: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  main: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default BurgerConstructorIngredients;
