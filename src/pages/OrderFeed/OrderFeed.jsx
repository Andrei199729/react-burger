import React, { useMemo } from "react";
import styles from "./OrderFeed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

function OrderFeed(props) {
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

  return (
    <>
      <div className={`${styles.text} mb-6`}>
        <p className={`text text_type_digits-default`}>{`#${props.number}`}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(props.updatedAt)} />
        </p>
      </div>
      <h2 className={`text text_type_main-medium mb-6`}>{props.name}</h2>
      <div className={`${styles.box}`}>
        <ul className={`${styles["lists-ingredient"]}`}>
          {feedIngredients
            .map((ingredient, index) => {
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
                  {feedIngredients.length >= 7 && (
                    <p
                      className={`${styles.count} text text_type_main-default`}
                    >
                      {`+${feedIngredients.length - 6}`}
                    </p>
                  )}
                </li>
              );
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

export default OrderFeed;
