import React, { FC, useMemo } from "react";
import styles from "./OrderFeed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMatch } from "react-router-dom";

import { PROFILE_ORDERS_PATH } from "../../utils/constants";
import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";

interface IOrderFeed {
  ingredients: string[];
  number: number;
  updatedAt: string;
  name: string;
  status: string;
  createdAt: string;
}

const OrderFeed: FC<IOrderFeed> = (props) => {
  const matchHistoryProfile = useMatch(PROFILE_ORDERS_PATH);

  const ingredienstId = props.ingredients;
  const { ingredients } = useSelector((state) => state.ingredients);

  const set = new Set(ingredienstId.map((item) => item));
  const feedIngredients = ingredients.filter((item: TIngredient) =>
    set.has(item._id)
  );
  const priceMains = feedIngredients.map(
    (price: TIngredient) => price.type !== "bun" && price.price
  );

  const priceBuns = feedIngredients.map(
    (price: TIngredient) => price.type === "bun" && price.price
  );

  const totalPriceMains = useMemo(() => {
    if (!feedIngredients) {
      return 0;
    }
    return priceMains?.reduce(
      (sum: number, ingredient: number | boolean) =>
        typeof ingredient === "number" ? sum + ingredient : sum,
      0
    );
  }, [feedIngredients, priceMains]);

  const totalPriceBuns = useMemo(() => {
    if (!feedIngredients) {
      return 0;
    }

    return priceBuns?.reduce(
      (sum: number, ingredient: number | boolean) =>
        typeof ingredient === "number" ? sum + ingredient * 2 : sum,
      0
    );
  }, [feedIngredients, priceBuns]);

  return (
    <>
      <div className={`${styles.text} mb-6`}>
        <p className={`text text_type_digits-default`}>{`#${props.number}`}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(props.updatedAt)} />
        </p>
      </div>
      <h2 className={`text text_type_main-medium`}>{props.name}</h2>
      {matchHistoryProfile && (
        <p
          className={`text text_type_main-default mt-2 ${
            props.status === "done" && styles.done
          }`}
        >
          {props.status === "created" && "Создан"}
          {props.status === "pending" && "Готовится"}
          {props.status === "done" && "Выполнен"}
          {props.status === "canceled" && "Отменен"}
        </p>
      )}
      <div className={`${styles.box}  mt-6`}>
        <ul className={`${styles["lists-ingredient"]}`}>
          {feedIngredients
            .map(
              (
                ingredient: {
                  image_mobile: string | undefined;
                  name: string | undefined;
                },
                index: React.Key | null | undefined
              ) => {
                return (
                  <li
                    className={`${styles.list} ${
                      feedIngredients.length >= 7 && styles["list-count"]
                    }`}
                    key={index}
                  >
                    <img
                      className={`${styles["image"]}`}
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                    />
                    {index === 5 && (
                      <p
                        className={`${styles.count} text text_type_main-default`}
                      >
                        {feedIngredients.length - 6 === 0
                          ? ""
                          : `+${feedIngredients.length - 6}`}
                      </p>
                    )}
                  </li>
                );
              }
            )
            .slice(0, 6)}
        </ul>
        <div className={`${styles["total-price__box"]}`}>
          <p className="text text_type_main-medium mr-2">
            {totalPriceMains + totalPriceBuns}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

export default OrderFeed;
