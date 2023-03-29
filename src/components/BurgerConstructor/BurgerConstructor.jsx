import React, { useContext, useState, useEffect } from "react";
import styles from "./BurgerConstructor.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientsContext } from "../../services/appContext";
import { OrderBurgerContext } from "../../services/orderBurgerContext";
import { OrderDetailsPopupOpenContext } from "../../services/orderDetailsPopupOpenContext";

import TotalPrice from "../TotalPrice/TotalPrice";
import orderApi from "../../utils/ordersApi";

function BurgerConstructor() {
  const { ingredients } = useContext(IngredientsContext);
  const { setOrderBurger } = useContext(OrderBurgerContext);
  const { setIsOrderDetailsPopupOpen } = useContext(
    OrderDetailsPopupOpenContext
  );

  const random = Math.floor(Math.random() * ingredients.data?.length);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [locked, setLocked] = useState(true);

  const ingredientsData = ingredients.data;
  const filterBun = ingredientsData?.filter((bun) => bun.type === "bun" && bun);
  const filterMain = ingredientsData?.filter(
    (bun) => bun.type !== "bun" && bun
  );

  const burgerObject = {
    bun: filterBun,
    ingredients: filterMain,
  };

  useEffect(() => {
    let total = 0;
    let bun = 0;

    burgerObject.ingredients?.forEach((main) => {
      return main.type !== "bun" && (total += main.price);
    });

    burgerObject.bun?.forEach((main) => {
      return (
        main.type === "bun" &&
        main._id === "60d3b41abdacab0026a733c6" &&
        (bun += main.price)
      );
    });

    setTotalPrice(total + bun * 2);
  }, [
    ingredientsData,
    ingredients.data,
    random,
    burgerObject.ingredients,
    burgerObject.bun,
  ]);

  function handleCheckout() {
    const ingredientsId = ingredientsData?.map(
      (ingredientId) => ingredientId._id
    );
    fetch(orderApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject("something wrong");
        }
      })
      .then((res) => {
        setOrderBurger(res);
        setIsOrderDetailsPopupOpen(true);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен", err);
      });
  }

  return (
    <section className={`${styles["burger-constructor"]} ml-4 mt-25`}>
      <div className={`${styles["burger-constructor__container"]}`}>
        <div className={`${styles.bun} ml-8`}>
          {burgerObject.bun?.map((burgerBun) => {
            return (
              burgerBun._id === "60d3b41abdacab0026a733c6" && (
                <ConstructorElement
                  type="top"
                  key={burgerBun._id}
                  isLocked={locked}
                  text={`${burgerBun.name} (верх)`}
                  price={burgerBun.price}
                  thumbnail={burgerBun.image_mobile}
                />
              )
            );
          })}
        </div>
        <div className={`${styles.scroll}`}>
          {burgerObject.ingredients?.map((main) => {
            return (
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
            );
          })}
        </div>
        <div className={`${styles.bun} ml-8`}>
          {burgerObject.bun?.map((burgerBun) => {
            return (
              burgerBun._id === "60d3b41abdacab0026a733c6" && (
                <ConstructorElement
                  type="bottom"
                  key={burgerBun._id}
                  isLocked={locked}
                  text={`${burgerBun.name} (низ)`}
                  price={burgerBun.price}
                  thumbnail={burgerBun.image_mobile}
                />
              )
            );
          })}
        </div>
      </div>
      <TotalPrice totalPrice={totalPrice} handleCheckout={handleCheckout} />
    </section>
  );
}

export default BurgerConstructor;
