import React, { forwardRef } from "react";
import styles from "./IngredientList.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { INGREDIENT_DATA_MODAL } from "../../services/actions/popupIngredient";
import Ingredient from "../Ingredient/Ingredient";
import { Link, useLocation } from "react-router-dom";

const IngredientList = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const dataIngredients = (e) => {
    const clickId = props.ingredients.filter(
      (item) => item._id === e.currentTarget.id
    );
    dispatch({
      type: INGREDIENT_DATA_MODAL,
      ingredientsDataModal: clickId,
    });
  };

  return (
    <div
      className={`${styles["burger-ingredient"]}`}
      id={props.idTab}
      ref={ref}
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
              <Link
                to={`/ingredients/${ingredient._id}`}
                state={{ background: location }}
                key={ingredient._id}
                className={styles.link}
              >
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                  dataIngredients={dataIngredients}
                />
              </Link>
            )
          );
        })}
      </ul>
    </div>
  );
});

IngredientList.propTypes = {
  idTab: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  category: PropTypes.string.isRequired,
};

export default IngredientList;
