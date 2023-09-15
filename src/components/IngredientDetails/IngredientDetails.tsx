import React from "react";
import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";

function IngredientDetails() {
  const { id } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);

  const ingredientId = ingredients.find((item: TIngredient) => item._id === id);

  if (!ingredientId) {
    return null;
  }

  return (
    <>
      <img src={ingredientId.image_large} alt={ingredientId.name} />
      <div className={`${styles["mass-ingredient"]} mt-4 mb-15`}>
        <h3 className={`text text_type_main-medium`}>{ingredientId.name}</h3>
        <div className={`${styles["mass-ingredient__container"]} mt-8`}>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Калории,ккал
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {ingredientId.calories}
            </p>
          </div>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Белки, г
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {ingredientId.proteins}
            </p>
          </div>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Жиры, г
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {ingredientId.fat}
            </p>
          </div>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Углеводы, г
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              {ingredientId.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;
