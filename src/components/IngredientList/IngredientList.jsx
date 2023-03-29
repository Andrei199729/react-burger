import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext } from "react";
import styles from "./IngredientList.module.css";
import PropTypes from "prop-types";
import { IngredientsDataContext } from "../../services/ingredientsDataContext";
import { IngredientDetailsPopupOpenContext } from "../../services/ingredientDetailsPopupOpenContext";

function IngredientList(props) {
  const { setIngredientsData } = useContext(IngredientsDataContext);

  const { setIsIngredientDetailsPopupOpen } = useContext(
    IngredientDetailsPopupOpenContext
  );

  function dataIngredients(e) {
    setIsIngredientDetailsPopupOpen(true);
    const clickId = props.ingredients.filter(
      (ingredient) => ingredient._id === e.currentTarget.id
    );
    setIngredientsData(clickId);
  }

  return (
    <div className={`${styles["burger-ingredient"]}`} id={props.idTab}>
      <h2 className="text text_type_main-small mb-6">{props.title}</h2>
      <ul className={`${styles["burger-ingredient__container-lists"]}`}>
        {props.ingredients?.map((ingredient) => {
          return (
            ingredient.type === props.category && (
              <li
                className={`${styles.card}`}
                key={ingredient._id}
                onClick={dataIngredients}
                id={ingredient._id}
              >
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
  ingredients: PropTypes.array,
  category: PropTypes.string.isRequired,
};

export default IngredientList;
