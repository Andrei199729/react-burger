import React, { useState, useMemo, useEffect } from "react";

import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";

import { getIngredients } from "../../services/actions/ingredient";

function BurgerIngredients() {
  const [current, setCurrent] = useState("rolls");
  const { ingredients } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [refRolls, inViewRolls] = useInView({
    threshold: 0,
  });

  const [refSauces, inViewSauces] = useInView({
    threshold: 0,
  });

  const [refMains, inViewMains] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewRolls) {
      setCurrent("rolls");
    } else if (inViewSauces) {
      setCurrent("sauces");
    } else if (inViewMains) {
      setCurrent("mains");
    }
  }, [inViewRolls, inViewMains, inViewSauces]);

  const rolls = useMemo(
    () => ingredients?.filter((roll) => roll.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients?.filter((sauce) => sauce.type === "sauce"),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients?.filter((main) => main.type === "main"),
    [ingredients]
  );

  const handleClickTab = (name) => {
    setCurrent(name);
    const element = document.getElementById(`${name}`);
    if (element) {
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  return (
    <>
      <section className={`${styles["burger-ingredients"]} mr-10`}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <div className={`${styles["burger-ingredients__tabs"]}`}>
          <Tab
            value="rolls"
            active={current === "rolls"}
            onClick={handleClickTab}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={handleClickTab}
          >
            Соусы
          </Tab>
          <Tab
            value="mains"
            active={current === "mains"}
            onClick={handleClickTab}
          >
            Начинки
          </Tab>
        </div>
        <div className={`${styles["burger-ingredient__scroll"]} mt-10`}>
          <IngredientList
            idTab="rolls"
            ingredients={rolls}
            title="Булки"
            category="bun"
            ref={refRolls}
          />
          <IngredientList
            idTab="sauces"
            ingredients={sauces}
            title="Соусы"
            category="sauce"
            ref={refSauces}
          />
          <IngredientList
            idTab="mains"
            ingredients={mains}
            title="Начинки"
            category="main"
            ref={refMains}
          />
        </div>
      </section>
    </>
  );
}

export default BurgerIngredients;
