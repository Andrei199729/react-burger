import React, { MouseEvent, forwardRef } from "react";
import styles from "./IngredientList.module.css";
import { INGREDIENT_DATA_MODAL } from "../../services/actions/popupIngredient";
import Ingredient from "../Ingredient/Ingredient";
import { Link, useLocation } from "react-router-dom";

import { INGREDIENTS_PATH } from "../../utils/constants";
import { TIngredient } from "../../services/types/data";
import { useDispatch } from "../../services/hooks";

interface IIngredientList {
  idTab: string;
  title: string;
  ingredients: TIngredient[];
  category: string;
}

const IngredientList = forwardRef<HTMLDivElement, IIngredientList>(
  (props: IIngredientList, ref) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const dataIngredients = (e: MouseEvent<HTMLLIElement>) => {
      const clickId = props.ingredients.filter(
        (item: TIngredient): item is TIngredient =>
          item._id === e.currentTarget.id
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
  }
);

export default IngredientList;
