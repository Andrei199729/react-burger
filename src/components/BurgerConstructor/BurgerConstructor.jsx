import React, { useContext, useMemo } from "react";
import styles from "./BurgerConstructor.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
} from "../../services/actions/ingredient";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { OrderDetailsPopupOpenContext } from "../../service/orderDetailsPopupOpenContext";

import TotalPrice from "../TotalPrice/TotalPrice";
import { postIngredientsConstructorBurger } from "../../services/actions/ingredient";
import { useDrop } from "react-dnd";

function BurgerConstructor(props) {
  const dispatch = useDispatch();
  const { ingredients, ingredientsConstructor } = useSelector(
    (state) => state.ingredients
  );

  const mainsIngredients = useMemo(() => {
    return ingredientsConstructor?.filter(
      (ingredient) => ingredient.type !== "bun" && ingredient
    );
  }, [ingredientsConstructor]);

  const totalPrice = useMemo(() => {
    if (!ingredientsConstructor) {
      return 0;
    }
    return ingredientsConstructor?.reduce(
      (sum, ingredient) =>
        sum + ingredient.price * (ingredient.type === "bun" ? 2 : 1),
      0
    );
  }, [ingredientsConstructor]);

  const bun = useMemo(() => {
    return ingredientsConstructor?.find((bun) => bun.type === "bun");
  }, [ingredientsConstructor]);

  const id = useMemo(() => {
    return mainsIngredients?.map(
      (ingredient) => ingredient.type !== "bun" && ingredient._id
    );
  }, [mainsIngredients]);

  const moveConstructorItem = (item) => {
    dispatch({ type: ADD_CONSTRUCTOR_ITEM, ...item });
  };

  const [{ isHover, drop }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      moveConstructorItem(itemId);
    },
  });
  const { setIsOrderDetailsPopupOpen } = useContext(
    OrderDetailsPopupOpenContext
  );

  function handleCheckout() {
    const ingredientsId = ingredients?.map((ingredientId) => ingredientId._id);
    dispatch(postIngredientsConstructorBurger(ingredientsId));
    setIsOrderDetailsPopupOpen(true);
  }

  const onDelete = () => {
    dispatch({
      type: DELETE_CONSTRUCTOR_ITEM,
      id,
    });
    console.log(id);
  };

  return (
    <section
      className={`${styles["burger-constructor"]}   ${
        isHover ? styles.onHover : ""
      } ml-4 mt-25`}
      ref={dropTarget}
    >
      <div className={`${styles["burger-constructor__container"]}`}>
        {!bun && (
          <p className={`text text_type_main-medium ${styles.tip}`}>
            Пожалуйста, перенесите сюда булку для создания заказа
          </p>
        )}
        <div className={`${styles.bun} ml-8`}>
          {bun && (
            <ConstructorElement
              type="top"
              key={bun._id}
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          )}
        </div>
        <div className={`${styles.scroll}`}>
          {mainsIngredients?.map((main, index) => {
            return (
              <div key={index} className={`${styles.icon} mr-2`}>
                <div className={`mr-2`}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  key={main._id}
                  text={main.name}
                  price={main.price}
                  thumbnail={main.image_mobile}
                  handleClose={onDelete}
                />
              </div>
            );
          })}
        </div>
        <div className={`${styles.bun} ml-8`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              key={bun._id}
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          )}
        </div>
      </div>
      <TotalPrice totalPrice={totalPrice} handleCheckout={handleCheckout} />
    </section>
  );
}

export default BurgerConstructor;
