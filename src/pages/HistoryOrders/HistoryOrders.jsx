import React, { useEffect } from "react";
import styles from "./HistoryOrders.module.css";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";
import {
  WS_CONNECTION_CLOSED,
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import { initFeedProfileOrders } from "../../services/reducers/wsReducer";
import OrderFeed from "../OrderFeed/OrderFeed";

function HistoryOrders() {
  const location = useLocation();
  const accessToken = getCookie("accessToken").slice(7);
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.ws);

  useEffect(() => {
    dispatch(initFeedProfileOrders(accessToken));
    return () => dispatch({ type: WS_CONNECTION_CLOSED });
  }, [dispatch, accessToken]);

  return (
    <section className={`${styles["history-orders__constructor"]}`}>
      {orders && orders.length <= 0 && (
        <p className={`text text_type_main-large`}>Сделайте заказ</p>
      )}
      <div className={`${styles.scroll}`}>
        <div className={`${styles["cards-order"]}`}>
          {orders?.map((order) => {
            return (
              <Link
                to={`/profile/orders/${order._id}`}
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
    </section>
  );
}

export default HistoryOrders;
