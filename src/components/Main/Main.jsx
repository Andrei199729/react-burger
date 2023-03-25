import React from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import PropTypes from "prop-types";

import styles from "./Main.module.css";

function Main(props) {
  return (
    <main className={styles.main}>
      <BurgerIngredients
        onIngredientDetails={props.onIngredientDetails}
        onIngredientsData={props.onIngredientsData}
      />
      <BurgerConstructor
        onOrderDetails={props.onOrderDetails}
        setOrderBurger={props.setOrderBurger}
      />
    </main>
  );
}

Main.propTypes = {
  onOrderDetails: PropTypes.func.isRequired,
  onIngredientDetails: PropTypes.func.isRequired,
  onIngredientsData: PropTypes.func.isRequired,
};

export default Main;
