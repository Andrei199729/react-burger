import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, MouseEvent, useMemo } from "react";
import styles from "./Ingredient.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";

interface IIngredient {
  ingredient: TIngredient;
  dataIngredients: (e: MouseEvent<HTMLLIElement>) => void;
}

interface IResult {
  [result: string]: any;
}

const Ingredient: FC<IIngredient> = ({ ingredient, dataIngredients }) => {
  const { ingredientsConstructor, bun } = useSelector(
    (state) => state.constructorItems
  );
  const id = ingredient._id;
  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const ingredientsCount = useMemo(() => {
    const result: IResult = {};
    ingredientsConstructor?.forEach((item) => {
      result[item._id] = result[item._id] ?? 0;
      result[item._id]++;
    });
    if (bun) result[bun._id] = 2;
    return result;
  }, [ingredientsConstructor, bun]);

  return (
    <li
      className={`${styles.card}`}
      key={ingredient._id}
      onClick={dataIngredients}
      id={ingredient._id}
      style={{ opacity }}
      ref={ref}
    >
      {ingredientsCount[id] && (
        <Counter count={ingredientsCount[id]} size="default" extraClass="m-1" />
      )}
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
    </li>
  );
};

export default Ingredient;
