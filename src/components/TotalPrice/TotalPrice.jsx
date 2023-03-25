import React from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./TotalPrice.module.css";
import PropTypes from "prop-types";

function TotalPrice(props) {
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
      >
        Оформить заказ
      </Button>
    </div>
  );
}

TotalPrice.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};

export default TotalPrice;
