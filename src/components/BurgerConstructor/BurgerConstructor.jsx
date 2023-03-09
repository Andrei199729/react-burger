import React, { useState } from "react";
import styles from "./BurgerConstructor.module.css";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerConstructor(props) {
  const [locked, setLocked] = useState(true);

  return (
    <section className={`${styles["burger-constructor"]} ml-4 mt-25`}>
      <div className={`${styles["burger-constructor__container"]}`}>
        <div className={`${styles.bun} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={locked}
            text={`Краторная булка N-200i (верх)`}
            price={1255}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
        <div className={`${styles.scroll}`}>
          {props.ingredients.data?.map((main) => {
            return (
              main.type !== "bun" && (
                <div key={main._id} className={`${styles.icon} mr-2`}>
                  <div className={`${styles["drag-icon"]} mr-2`}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    key={main._id}
                    text={main.name}
                    price={main.price}
                    thumbnail={main.image_mobile}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className={`${styles.bun} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={locked}
            text={`Краторная булка N-200i (низ)`}
            price={1255}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
      </div>
      <div className={`${styles["total-price"]} mt-10`}>
        <div className={`${styles["total-price__box"]} mr-10`}>
          <p className="text text_type_main-medium mr-2">666</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={props.onOrderDetails}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  onOrderDetails: PropTypes.func.isRequired,
};

export default BurgerConstructor;
