import React, { useEffect } from "react";
import styles from "./HistoryOrders.module.css";
import { Link, useLocation, useMatch } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import { PROFILE_ORDERS_PATH } from "../../utils/constants";
import { initFeedProfileOrders } from "../../services/reducers/wsReducerProfile";
import OrderFeed from "../OrderFeed/OrderFeed";
import { wsConnectionClosedProfile } from "../../services/actions/wsActionProfile";

function HistoryOrders() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const match = useMatch(PROFILE_ORDERS_PATH);
  const { orders } = useAppSelector((store) => store.wsProfile);

  useEffect(() => {
    if (match) {
      const accessToken = getCookie("accessToken").split(" ")[1];
      dispatch(initFeedProfileOrders(accessToken));
    }
    return () => {
      if (match) dispatch(wsConnectionClosedProfile());
    };
  }, [dispatch, match]);

  return (
    <section className={`${styles["history-orders__constructor"]}`}>
      {orders.length === 0 && (
        <p className={`text text_type_main-large`}>Сделайте заказ</p>
      )}
      <div className={`${styles.scroll}`}>
        <div className={`${styles["cards-order"]}`}>
          {orders
            ?.map((order) => {
              return (
                <Link
                  to={`${PROFILE_ORDERS_PATH}/${order._id}`}
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
            })
            .reverse()}
        </div>
      </div>
    </section>
  );
}

export default HistoryOrders;
