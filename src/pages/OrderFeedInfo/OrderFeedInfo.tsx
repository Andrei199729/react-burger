import React, { useEffect, useMemo, useState } from "react";
import styles from "./OrderFeedInfo.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import OrdersFeed from "../OrdersFeed/OrdersFeed";
import { initFeed } from "../../services/reducers/wsReducer";

import { ORDER_FEED_PATH } from "../../utils/constants";
import { useSelector } from "../../services/hooks";
import { wsConnectionClosed } from "../../services/actions/wsAction";

interface IObjOutput {
  [objOutput: string]: number;
}

function OrderFeedInfo() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [currectObj] = useState({});

  const { orders } = useAppSelector((store) => store.ws);
  const ingredientId = orders?.find((item) => item._id === id);
  const { ingredients } = useSelector((state) => state.ingredients);
  const objIngredients = Object.fromEntries(
    Object.entries(ingredientId || {}).map(([key, value]) => [key, value])
  );
  const currectArr = objIngredients.ingredients as string[];

  const set = new Set(currectArr?.map((item: string) => item));
  const feedIngredients = ingredients?.filter((item) => set.has(item._id));

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
    return priceMains?.reduce(
      (sum: number, ingredient: any) => sum + ingredient,
      0
    );
  }, [feedIngredients, priceMains]);

  const totalPriceBuns = useMemo(() => {
    if (!feedIngredients) {
      return 0;
    }
    return priceBuns?.reduce(
      (sum: number, ingredient: any) => sum + ingredient * 2,
      0
    );
  }, [feedIngredients, priceBuns]);

  useEffect(() => {
    dispatch(initFeed());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const setNewValueInObj = (
    arrValue: string,
    arrInput: string[],
    objOutput: IObjOutput
  ) => {
    let buffs = [];

    arrInput.forEach((e: string) => {
      console.log(e);

      if (e === arrValue) {
        buffs.push(e);
      }
    });

    objOutput[arrValue] = buffs.length;
  };

  currectArr?.forEach((e) => {
    setNewValueInObj(e, currectArr, currectObj);
  });

  const doublePrices = Object.fromEntries(
    Object.entries(currectObj).map(([key, value]) => [key, value])
  );

  return (
    <>
      {location.pathname === ORDER_FEED_PATH ? (
        <OrdersFeed />
      ) : (
        ingredientId && (
          <section className={`${styles["order-info"]} mb-30`}>
            <div className={`${styles["order-info__container"]}`}>
              <p
                className={`${styles.number} text text_type_digits-default mb-10`}
              >
                #{ingredientId.number}
              </p>
              <h2 className="text text_type_main-medium mb-3">
                {ingredientId.name}
              </h2>
              <p
                className={`${styles.function} text text_type_main-default mb-15`}
              >
                {ingredientId.status === "done" ? "Готово" : "В ожидании"}
              </p>
              <p className="text text_type_main-medium mb-6">Состав:</p>
              <div className={`${styles.scroll} mb-10`}>
                {feedIngredients.map((item) => {
                  return (
                    <div
                      className={`${styles["info-ingredient"]} mr-6`}
                      key={item._id}
                    >
                      <div className={`${styles["image-container"]} mr-4`}>
                        <img
                          className={`${styles.image}`}
                          src={item.image_mobile}
                          alt={item.name}
                        />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                      <div className={`${styles.count}`}>
                        <p className="text text_type_digits-default mr-2 ml-4">
                          {`${doublePrices[item._id]} x ${item.price}`}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`${styles["box-date"]}`}>
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(ingredientId.updatedAt)} />
                </p>
                <div className={`${styles.total}`}>
                  <p className="text text_type_digits-default mr-2">
                    {totalPriceMains + totalPriceBuns}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default OrderFeedInfo;
