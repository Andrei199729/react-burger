import React, { useEffect, useMemo, useState } from "react";
import styles from "./OrderInfo.module.css";

import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/actions-types/wsActionTypes";
import HistoryOrders from "../HistoryOrders/HistoryOrders";

import { ORDER_FEED_PATH } from "../../utils/constants";
import { getOrder } from "../../services/actions/popupOrder";
import { useSelector } from "../../services/hooks";

type TNumberParams = {
  number: string;
};

interface IObjOutput {
  [objOutput: string]: number;
}

function OrderInfo() {
  const { number } = useParams<TNumberParams>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  const { createdOrder } = useSelector((store) => store.popupOrder);

  const [currectObj] = useState({});

  const objIngredients = useMemo(() => {
    return Object.fromEntries(
      Object.entries(createdOrder || {}).map(([key, value]: any) => [
        key,
        value,
      ])
    );
  }, [createdOrder]);

  const currectArr: string[] = objIngredients.ingredients;
  console.log(objIngredients);

  useEffect(() => {
    dispatch(getOrder(number));
  }, [dispatch, number]);
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

  const setNewValueInObj = (
    arrValue: string,
    arrInput: string[],
    objOutput: IObjOutput
  ) => {
    let buffs = [];

    arrInput.forEach((e: string) => {
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
        <HistoryOrders />
      ) : (
        createdOrder && (
          <section className={`${styles["order-info"]} mb-30`}>
            <div className={`${styles["order-info__container"]}`}>
              <p
                className={`${styles.number} text text_type_digits-default mb-10`}
              >
                #{createdOrder.number}
              </p>
              <h2 className="text text_type_main-medium">
                {createdOrder.name}
              </h2>
              <p
                className={`text text_type_main-default mt-3 mb-6 ${
                  createdOrder.status === "done" && styles.done
                }`}
              >
                {createdOrder.status === "created" && "Создан"}
                {createdOrder.status === "pending" && "Готовится"}
                {createdOrder.status === "done" && "Выполнен"}
                {createdOrder.status === "canceled" && "Отменен"}
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
                  <FormattedDate date={new Date(createdOrder.updatedAt)} />
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
