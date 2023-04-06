import React, { useContext } from "react";
import styles from "./IngredientList.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { INGREDIENT_DATA_MODAL } from "../../services/actions/ingredient";
import Ingredient from "../Ingredient/Ingredient";
import { IngredientDetailsPopupOpenContext } from "../../service/ingredientDetailsPopupOpenContext";

function IngredientList(props) {
  const { setIsIngredientDetailsPopupOpen } = useContext(
    IngredientDetailsPopupOpenContext
  );
  const dispatch = useDispatch();

  function dataIngredients(e) {
    setIsIngredientDetailsPopupOpen(true);
    const clickId = props.ingredients.filter(
      (item) => item._id === e.currentTarget.id
    );
    dispatch({
      type: INGREDIENT_DATA_MODAL,
      ingredientsDataModal: clickId,
    });
  }

  return (
    <div
      className={`${styles["burger-ingredient"]}`}
      id={props.idTab}
      ref={props.innerRef}
    >
      <h2
        className={`text text_type_main-small mb-6 ${
          props.category !== "bun" && "mt-10"
        } `}
      >
        {props.title}
      </h2>
      <ul className={`${styles["burger-ingredient__container-lists"]}`}>
        {props.ingredients?.map((ingredient) => {
          return (
            ingredient.type === props.category && (
              <Ingredient
                ingredient={ingredient}
                key={ingredient._id}
                dataIngredients={dataIngredients}
              />
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
