import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./IngredientList.module.css";
import PropTypes from "prop-types";

function IngredientList({ idTab, title, ingredients, category }) {
  return (
    <div className={`${styles["burger-ingredient"]}`} id={idTab}>
      <h2 className="text text_type_main-small mb-6">{title}</h2>
      <ul className={`${styles["burger-ingredient__container-lists"]}`}>
        {ingredients.map((ingredient) => {
          return (
            ingredient.type === category && (
              <li className={`${styles.card}`} key={ingredient._id}>
                <Counter count={1} size="default" extraClass="m-1" />
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
            )
          );
        })}
      </ul>
    </div>
  );
}

IngredientList.propTypes = {
  idTab: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default IngredientList;
