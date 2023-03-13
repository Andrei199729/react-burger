import React from "react";
import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

function IngredientDetails(props) {
  return (
    <>
      {props.ingredientsData.map((ingredientData) => {
        return (
          <React.Fragment key={ingredientData._id}>
            <img src={ingredientData.image_large} alt={ingredientData.name} />
            <div className={`${styles["mass-ingredient"]} mt-4 mb-15`}>
              <h3 className={`text text_type_main-medium`}>
                {ingredientData.name}
              </h3>
              <div className={`${styles["mass-ingredient__container"]} mt-8`}>
                <div className={`${styles["mass-ingredient__block"]}`}>
                  <p
                    className={`text text_type_main-default text_color_inactive mb-2`}
                  >
                    Калории,ккал
                  </p>
                  <p
                    className={`text text_type_digits-default text_color_inactive`}
                  >
                    {ingredientData.calories}
                  </p>
                </div>
                <div className={`${styles["mass-ingredient__block"]}`}>
                  <p
                    className={`text text_type_main-default text_color_inactive mb-2`}
                  >
                    Белки, г
                  </p>
                  <p
                    className={`text text_type_digits-default text_color_inactive`}
                  >
                    {ingredientData.proteins}
                  </p>
                </div>
                <div className={`${styles["mass-ingredient__block"]}`}>
                  <p
                    className={`text text_type_main-default text_color_inactive mb-2`}
                  >
                    Жиры, г
                  </p>
                  <p
                    className={`text text_type_digits-default text_color_inactive`}
                  >
                    {ingredientData.fat}
                  </p>
                </div>
                <div className={`${styles["mass-ingredient__block"]}`}>
                  <p
                    className={`text text_type_main-default text_color_inactive mb-2`}
                  >
                    Углеводы, г
                  </p>
                  <p
                    className={`text text_type_digits-default text_color_inactive`}
                  >
                    {ingredientData.carbohydrates}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

IngredientDetails.propTypes = {
  ingredientData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default IngredientDetails;
