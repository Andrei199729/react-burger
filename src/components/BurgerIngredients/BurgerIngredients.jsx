import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("Булки");
  const rolls =
    props.ingredients.data &&
    props.ingredients.data.filter((roll) => roll.type === "bun");
  const sauces =
    props.ingredients.data &&
    props.ingredients.data.filter((sauce) => sauce.type === "sauce");
  const mains =
    props.ingredients.data &&
    props.ingredients.data.filter((main) => main.type === "main");

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
          onClick={props.onIngredientDetails}
        />
        <IngredientList
          idTab="sauces"
          ingredients={sauces}
          title="Соусы"
          category="sauce"
          onClick={props.onIngredientDetails}
        />
        <IngredientList
          idTab="mains"
          ingredients={mains}
          title="Начинки"
          category="main"
          onClick={props.onIngredientDetails}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  onIngredientDetails: PropTypes.func.isRequired,
};

export default BurgerIngredients;
