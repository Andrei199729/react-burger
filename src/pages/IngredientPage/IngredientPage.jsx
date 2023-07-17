import React from "react";
import styles from "./IngredientPage.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "../../components/Main/Main";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

import { MAIN_PATH } from "../../utils/constants";

function IngredientPage() {
  const { id } = useParams();
  const location = useLocation();
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredientId = ingredients.find((item) => item._id === id);

  return (
    <>
      {location.pathname === MAIN_PATH ? (
        <Main />
      ) : (
        ingredientId && (
          <div className={`${styles.container} mt-30`}>
            <h2 className={`${styles.title} text text_type_main-large`}>
              Детали ингредиента
            </h2>
            <IngredientDetails />
          </div>
        )
      )}
    </>
  );
}

export default IngredientPage;
