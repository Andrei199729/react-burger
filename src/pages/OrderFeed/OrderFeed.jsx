import React, { useMemo } from "react";
import styles from "./OrderFeed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useMatch } from "react-router-dom";

import { PROFILE_ORDERS_PATH } from "../../utils/constants";

function OrderFeed(props) {
  const matchHistoryProfile = useMatch(PROFILE_ORDERS_PATH);

  const ingredienstId = props.ingredients;
  const { ingredients } = useSelector((state) => state.ingredients);

  const set = new Set(ingredienstId.map((item) => item));
  const feedIngredients = ingredients.filter((item) => set.has(item._id));
  const priceMains = feedIngredients.map(
    (price) => price.type !== "bun" && price.price
  );

  const priceBuns = feedIngredients.map(
    (price) => price.type === "bun" && price.price
  );

  const totalPriceMains = useMemo(() => {
    if (!feedIngredients) {
      return 0;
    }
    return priceMains?.reduce((sum, ingredient) => sum + ingredient, 0);
  }, [feedIngredients, priceMains]);

  const totalPriceBuns = useMemo(() => {
    if (!feedIngredients) {
      return 0;
    }
    return priceBuns?.reduce((sum, ingredient) => sum + ingredient * 2, 0);
  }, [feedIngredients, priceBuns]);

  const showCount = () => {
    if (feedIngredients.length - 6 === 0) {
      return false;
    } else {
      return true;
    }
  };

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
            .map((ingredient, index) => {
              if (index === 5) {
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
                    {showCount && (
                      <p
                        className={`${styles.count} text text_type_main-default`}
                      >
                        {`+${feedIngredients.length - 6}`}
                      </p>
                    )}
                  </li>
                );
              } else if (index < 5) {
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
                  </li>
                );
              }
            })
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
}

OrderFeed.prototype = {
  ingredients: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
};

export default OrderFeed;
