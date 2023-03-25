import React, { useContext, useState, useMemo } from "react";

import { IngredientsContext } from "../../services/appContext";

import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
  const [current, setCurrent] = useState("Булки");
  const { ingredients } = useContext(IngredientsContext);

  const rolls = useMemo(
    () =>
      ingredients.data &&
      ingredients.data.filter((roll) => roll.type === "bun"),
    [ingredients.data]
  );
  const sauces = useMemo(
    () =>
      ingredients.data &&
      ingredients.data.filter((sauce) => sauce.type === "sauce"),
    [ingredients.data]
  );
  const mains = useMemo(
    () =>
      ingredients.data &&
      ingredients.data.filter((main) => main.type === "main"),
    [ingredients.data]
  );

  return (
    <section className={`${styles["burger-ingredients"]} mr-10`}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles["burger-ingredients__tabs"]}`}>
        <a href="#rolls" className={`${styles["burger-ingredients__link"]}`}>
          <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauces" className={`${styles["burger-ingredients__link"]}`}>
          <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#mains" className={`${styles["burger-ingredients__link"]}`}>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </a>
      </div>
      <div className={`${styles["burger-ingredient__scroll"]} mt-10`}>
        <IngredientList
          idTab="rolls"
          ingredients={rolls}
          title="Булки"
          category="bun"
          onIngredientDetails={props.onIngredientDetails}
        />
        <IngredientList
          idTab="sauces"
          ingredients={sauces}
          title="Соусы"
          category="sauce"
          onIngredientDetails={props.onIngredientDetails}
        />
        <IngredientList
          idTab="mains"
          ingredients={mains}
          title="Начинки"
          category="main"
          onIngredientDetails={props.onIngredientDetails}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onIngredientDetails: PropTypes.func.isRequired,
};

export default BurgerIngredients;
