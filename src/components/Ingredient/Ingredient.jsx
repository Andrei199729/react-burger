import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import styles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

function Ingredient({ ingredient, dataIngredients }) {
  const { ingredientsConstructor } = useSelector((state) => state.ingredients);
  const id = ingredient._id;
  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const ingredientsCount = useMemo(() => {
    if (!ingredientsConstructor) {
      return {};
    }

    return ingredientsConstructor.reduce(
      (acc, item) => ({
        ...acc,
        [item._id]: (acc[item._id] || 0) + (item.type === "bun" ? 2 : 1),
      }),
      {}
    );
  }, [ingredientsConstructor]);

  return (
    <li
      className={`${styles.card}`}
      key={ingredient._id}
      onClick={dataIngredients}
      id={ingredient._id}
      style={{ opacity }}
      ref={ref}
    >
      {ingredientsCount[id] && (
        <Counter count={ingredientsCount[id]} size="default" extraClass="m-1" />
      )}
      <img
        className="pl-4 pr-4 mb-1"
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className={`${styles.price} text text_type_main-small mb-1`}>
        <span className="mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.name} text text_type_main-small`}>
        {ingredient.name}
      </p>
    </li>
  );
}

export default Ingredient;
