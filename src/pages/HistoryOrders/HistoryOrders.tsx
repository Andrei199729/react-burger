import React, { useEffect } from "react";
import styles from "./HistoryOrders.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import { PROFILE_ORDERS_PATH, WS_BASE_URL } from "../../utils/constants";
import OrderFeed from "../OrderFeed/OrderFeed";
import {
  disconnectProfile,
  wsConnectionStartAction,
} from "../../services/actions/wsActionProfile";
import { getCookie } from "../../utils/cookie";

function HistoryOrders() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.wsProfile);
  const accessToken = getCookie("accessToken")?.split("Bearer ")[1];

  useEffect(() => {
    dispatch(wsConnectionStartAction(`${WS_BASE_URL}?token=${accessToken}`));
    return () => {
      dispatch(disconnectProfile());
    };
  }, [accessToken, dispatch]);

  return (
    <section className={`${styles["history-orders__constructor"]}`}>
      {/* {orders?.length !== 0 ? ( */}
      {
        <div className={`${styles.scroll}`}>
          <div className={`${styles["cards-order"]}`}>
            {orders
              ?.map((order) => {
                return (
                  <Link
                    to={`${PROFILE_ORDERS_PATH}/${order.number}`}
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
        // )
        // : (
        // <p className={`text text_type_main-large`}>Сделайте заказ</p>
        // )
      }
    </section>
  );
}

export default HistoryOrders;
