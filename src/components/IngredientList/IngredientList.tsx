import React, { FC, forwardRef } from "react";
import styles from "./IngredientList.module.css";
import { useDispatch } from "react-redux";
import { INGREDIENT_DATA_MODAL } from "../../services/actions/popupIngredient";
import Ingredient from "../Ingredient/Ingredient";
import { Link, useLocation } from "react-router-dom";

import { INGREDIENTS_PATH } from "../../utils/constants";
import { TIngredient } from "../../services/types/data";

interface IIngredient {
  id: string;
  type: string;
}

interface IIngredientList {
  idTab: string;
  title: string;
  ingredient: IIngredient;
  ingredients: TIngredient;
  category: string;
}

const IngredientList: FC<IIngredientList> = forwardRef<
  HTMLDivElement,
  IIngredientList
>((props, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const dataIngredients = (e: any) => {
    const clickId = props.ingredients.filter(
      (item: TIngredient): item is TIngredient =>
        typeof item._id === e.currentTarget.id
    );
    dispatch({
      type: INGREDIENT_DATA_MODAL,
      ingredientsDataModal: clickId,
    });
  };

  return (
    <div
      className={`${styles["burger-ingredient"]}`}
      id={props.idTab}
      ref={ref}
    >
      <h2
        className={`text text_type_main-small mb-6 ${
          props.category !== "bun" && "mt-10"
        } `}
      >
        {props.title}
      </h2>
      <ul className={`${styles["burger-ingredient__container-lists"]}`}>
        {props.ingredients?.map((ingredient: TIngredient) => {
          return (
            ingredient.type === props.category && (
              <Link
                to={`${INGREDIENTS_PATH}/${ingredient._id}`}
                state={{ background: location }}
                key={ingredient._id}
                className={styles.link}
              >
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                  dataIngredients={dataIngredients}
                />
              </Link>
            )
          );
        })}
      </ul>
    </div>
  );
});

export default IngredientList;
