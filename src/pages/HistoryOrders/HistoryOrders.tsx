import React, { useEffect } from "react";
import styles from "./HistoryOrders.module.css";
import { Link, useLocation, useMatch } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/actions-types/wsActionTypes";
import {
  PROFILE_ORDERS_PATH,
  WS_BASE_URL,
  accessToken,
} from "../../utils/constants";
import OrderFeed from "../OrderFeed/OrderFeed";
import {
  wsConnectionClosedProfile,
  wsConnectionStartProfileAction,
} from "../../services/actions/wsActionProfile";

function HistoryOrders() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const match = useMatch(PROFILE_ORDERS_PATH);
  const { orders } = useAppSelector((store) => store.wsProfile);

  useEffect(() => {
    dispatch(
      wsConnectionStartProfileAction(
        `${WS_BASE_URL}?token=${accessToken?.split("Bearer ")[1]}`
      )
    );
    return () => {
      dispatch(wsConnectionClosedProfile());
    };
  }, [dispatch, match]);

  return (
    <section className={`${styles["history-orders__constructor"]}`}>
      {orders?.length !== 0 ? (
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
      ) : (
        <p className={`text text_type_main-large`}>Сделайте заказ</p>
      )}
    </section>
  );
}

export default HistoryOrders;
