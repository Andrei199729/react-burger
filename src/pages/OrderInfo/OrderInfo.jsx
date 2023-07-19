import React, { useEffect, useMemo } from "react";
import styles from "./OrderInfo.module.css";

import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  WS_CONNECTION_CLOSED,
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import { initFeedProfileOrders } from "../../services/reducers/wsReducer";
import { useSelector } from "react-redux";
import HistoryOrders from "../HistoryOrders/HistoryOrders";
import { getCookie } from "../../utils/cookie";

import { PROFILE_ORDERS_PATH } from "../../utils/constants";

function OrderInfo() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((store) => store.ws);
  const accessToken = getCookie("accessToken").slice(7);
  const ingredientId = orders?.find((item) => item._id === id);
  const { ingredients } = useSelector((state) => state.ingredients);
  const objIngredients = Object.fromEntries(
    Object.entries(ingredientId || {}).map(([key, value]) => [key, value])
  );
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
    dispatch(initFeedProfileOrders(accessToken));
    return () => dispatch({ type: WS_CONNECTION_CLOSED });
  }, [dispatch, accessToken]);

  if (!ingredientId) {
    return null;
  }

  let currectObj = {};
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
      {location.pathname === PROFILE_ORDERS_PATH ? (
        <HistoryOrders />
      ) : (
        ingredientId && (
          <section className={`${styles["order-info"]} mb-30`}>
            <div className={`${styles["order-info__container"]}`}>
              <p
                className={`${styles.number} text text_type_digits-default mb-10`}
              >
                #{ingredientId.number}
              </p>
              <h2 className="text text_type_main-medium">
                {ingredientId.name}
              </h2>
              <p
                className={`text text_type_main-default mt-3 mb-6 ${
                  ingredientId.status === "done" && styles.done
                }`}
              >
                {ingredientId.status === "created" && "Создан"}
                {ingredientId.status === "pending" && "Готовится"}
                {ingredientId.status === "done" && "Выполнен"}
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
