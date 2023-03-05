import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./BurgerIngredient.module.css";

function BurgerIngredient(props: any) {
  return (
    <div className={`${styles["burger-ingredient"]}`} id={props.idTab}>
      <h2 className="text text_type_main-small mb-6">{props.title}</h2>
      <div className={`${styles["burger-ingredient__container"]}`}>
        {props.ingredients.map((ingredient: any) => {
          return (
            ingredient.type === props.category && (
              <article className={`${styles.card}`} key={ingredient._id}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img
                  className="pl-4 pr-4 mb-1"
                  src={ingredient.image}
                  alt={ingredient.name}
                />
                <p className={`${styles.price} text text_type_main-small mb-1`}>
                  <span className="mr-2">{ingredient.price}</span>
                  <CurrencyIcon type="primary" />
                </p>
                <p className={`${styles.name} text text_type_main-small`}>
                  {ingredient.name}
                </p>
              </article>
            )
          );
        })}
      </div>
    </div>
    // <>{props.idTab === "rolls" ? console.log(props.idTab) : ""}</>
  );
}

export default BurgerIngredient;
