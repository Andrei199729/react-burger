import React, { FC } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./TotalPrice.module.css";
import { useSelector } from "../../services/hooks";

interface ITotalPrice {
  totalPrice: number;
  handleCheckout: any;
}

const TotalPrice: FC<ITotalPrice> = (props) => {
  const { userData } = useSelector((state) => state.user);

  const disabled = !userData ? true : false;
  return (
    <div className={`${styles["total-price"]} mt-10`}>
      <div className={`${styles["total-price__box"]} mr-10`}>
        <p className="text text_type_main-medium mr-2">{props.totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={props.handleCheckout}
        disabled={disabled}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default TotalPrice;
