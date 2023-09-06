import React, { FC } from "react";
import styles from "./BurgerConstructorIngredients.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrop, useDrag } from "react-dnd";
import { TIngredient } from "../../services/types/data";

interface IBurgerConstructorIngredients {
  id: string;
  findCard: (id: string) => TIngredient & {
    index: number;
  };
  moveCard: (droppedId: string, originalIndex: number) => TIngredient;
  name: string;
  price: number;
  imageMobile: string;
  onDelete: (main: TIngredient[] | undefined) => TIngredient;
  main?: TIngredient[];
}

const BurgerConstructorIngredients: FC<IBurgerConstructorIngredients> = (
  props
) => {
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
        handleClose={() => props.onDelete(props.main)}
        extraClass={`${isHover ? styles.onHover : ""}`}
      />
    </div>
  );
};

export default BurgerConstructorIngredients;
