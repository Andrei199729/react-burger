import React from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import PropTypes from "prop-types";

import styles from "./Main.module.css";

function Main(props) {
  return (
    <main className={styles.main}>
      <BurgerIngredients
        ingredients={props.ingredients}
        onIngredientDetails={props.onIngredientDetails}
        onIngredientsData={props.onIngredientsData}
      />
      <BurgerConstructor
        ingredients={props.ingredients}
        onOrderDetails={props.onOrderDetails}
      />
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  onOrderDetails: PropTypes.func.isRequired,
  onIngredientDetails: PropTypes.func.isRequired,
  onIngredientsData: PropTypes.func.isRequired,
};

export default Main;
