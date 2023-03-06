import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import { ingredients } from "../../utils/data";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("Булки");
  const rolls = ingredients.filter((roll) => roll.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const mains = ingredients.filter((main) => main.type === "main");
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
        />
        <IngredientList
          idTab="sauces"
          ingredients={sauces}
          title="Соусы"
          category="sauce"
        />
        <IngredientList
          idTab="mains"
          ingredients={mains}
          title="Начинки"
          category="main"
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
