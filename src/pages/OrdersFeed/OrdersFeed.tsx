import React, { useEffect } from "react";
import styles from "./OrdersFeed.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import OrderFeed from "../OrderFeed/OrderFeed";

import { ORDER_FEED_PATH, WS_BASE_URL_ALL } from "../../utils/constants";
import {
  wsConnectionClosed,
  wsConnectionStartAction,
} from "../../services/actions/wsAction";

function OrdersFeed() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector((store) => store.ws);

  useEffect(() => {
    dispatch(wsConnectionStartAction(WS_BASE_URL_ALL));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <section className={`${styles["order-feed"]}`}>
      <div className={`${styles["order-feed__container"]} mt-10`}>
        <div>
          <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
          <div className={`${styles.scroll} mb-10`}>
            <div className={`${styles["cards-order"]}`}>
              {orders?.map((order) => {
                return (
                  <Link
                    to={`${ORDER_FEED_PATH}/${order._id}`}
                    className={`${styles["card-order"]} p-6 mr-2`}
                    state={{ background: location }}
                    key={order._id}
                  >
                    <OrderFeed
                      createdAt={order.createdAt}
                      ingredients={order.ingredients}
                      name={order.name}
                      number={order.number}
                      status={order.status}
                      updatedAt={order.updatedAt}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`${styles.table} ml-15`}>
          <div className={`${styles["table-box"]} mb-15`}>
            <div className={`${styles["table-block"]}`}>
              <h3 className={`text text_type_main-medium mb-6`}>Готовы:</h3>
              <div className={`${styles["order-feed-column"]}`}>
                {orders.map((order) => {
                  return (
                    order.status === "done" && (
                      <p
                        className={`${styles["order-number"]} text text_type_digits-default`}
                        key={order._id}
                      >
                        {order.number}
                      </p>
                    )
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
              {orders.map((order) => {
                return (
                  order.status === "pending" && (
                    <p
                      className={`text text_type_digits-default mb-2`}
                      key={order._id}
                    >
                      {order.number}
                    </p>
                  )
                );
              })}
            </div>
          </div>
          <div className={`mb-15`}>
            <h3 className={`text text_type_main-medium`}>
              Выполнено за все время:
            </h3>
            <p className={`${styles.number} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div>
            <h3 className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </h3>
            <p className={`${styles.number} text text_type_digits-large`}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrdersFeed;
