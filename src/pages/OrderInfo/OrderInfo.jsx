import React, { useEffect, useMemo } from "react";
import styles from "./OrderInfo.module.css";

import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import { useSelector } from "react-redux";
import HistoryOrders from "../HistoryOrders/HistoryOrders";

import {
  ORDER_FEED_PATH,
  PROFILE_ORDERS_ID_PATH,
  PROFILE_ORDERS_PATH,
  accessToken,
} from "../../utils/constants";
import { getOrder } from "../../services/actions/popupOrder";

function OrderInfo() {
  const { number } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  let currectObj = {};
  const { orders } = useAppSelector((store) => store.wsProfile);
  const ingredientId = orders?.find((item) => item.number === number);
  const { ingredients } = useSelector((state) => state.ingredients);
  const objIngredients = Object.fromEntries(
    Object.entries(ingredientId || {}).map(([key, value]) => [key, value])
  );
  const { numberOrder } = useSelector((store) => store.popupOrder);
  const set = new Set(objIngredients.ingredients?.map((item) => item));
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
    return priceMains?.reduce((sum, ingredient) => sum + ingredient, 0);
  }, [feedIngredients, priceMains]);

  const totalPriceBuns = useMemo(() => {
    if (!feedIngredients) {
      return 0;
    }
    return priceBuns?.reduce((sum, ingredient) => sum + ingredient * 2, 0);
  }, [feedIngredients, priceBuns]);

  useEffect(() => {
    dispatch(getOrder(number));
  }, [dispatch, number]);

  if (!ingredientId) {
    return null;
  }

  const currectArr = objIngredients.ingredients;

  const setNewValueInObj = (arrValue, arrInput, objOutput) => {
    let buffs = [];

    arrInput.forEach((e) => {
      if (e === arrValue) {
        buffs.push(e);
      }
    });

    objOutput[arrValue] = buffs.length;
  };

  [...currectArr].forEach((e) => {
    setNewValueInObj(e, currectArr, currectObj);
  });

  const doublePrices = Object.fromEntries(
    Object.entries(currectObj).map(([key, value]) => [key, value])
  );

  return (
    <>
      {location.pathname === ORDER_FEED_PATH ? (
        <HistoryOrders />
      ) : (
        numberOrder && (
          <section className={`${styles["order-info"]} mb-30`}>
            <div className={`${styles["order-info__container"]}`}>
              <p
                className={`${styles.number} text text_type_digits-default mb-10`}
              >
                #{numberOrder.number}
              </p>
              <h2 className="text text_type_main-medium">{numberOrder.name}</h2>
              <p
                className={`text text_type_main-default mt-3 mb-6 ${
                  numberOrder.status === "done" && styles.done
                }`}
              >
                {numberOrder.status === "created" && "Создан"}
                {numberOrder.status === "pending" && "Готовится"}
                {numberOrder.status === "done" && "Выполнен"}
                {numberOrder.status === "canceled" && "Отменен"}
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

export default OrderInfo;
