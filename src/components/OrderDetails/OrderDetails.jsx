import React from "react";
import styles from "./OrderDetails.module.css";
import graphics from "../../images/graphics.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { createdOrder } = useSelector((state) => state.popupOrder);
  console.log("create", createdOrder);
  return (
    <div>
      {createdOrder.order?.map((order) => {
        console.log("order", order);
        return (
          <h2
            className={`${styles["modal__title"]} text text_type_digits-large mt-9`}
          >
            {order.order.number}
          </h2>
        );
      })}

      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img
        className={`${styles["icon-graphics"]} mt-15`}
        src={graphics}
        alt="Заказа принят"
      />
      <p className={`text text_type_main-default mt-15`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`text text_type_main-default text_color_inactive mt-2 mb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
