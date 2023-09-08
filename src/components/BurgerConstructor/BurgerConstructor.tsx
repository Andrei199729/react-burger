import React, { useMemo } from "react";
import styles from "./BurgerConstructor.module.css";

import { LOGIN_PATH } from "../../utils/constants";

import {
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_CONSTRUCTOR_ITEM,
  addConstructorItemAction,
} from "../../services/actions/constructor";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import TotalPrice from "../TotalPrice/TotalPrice";
import { postIngredientsConstructorBurger } from "../../services/actions/popupOrder";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import BurgerConstructorIngredients from "../BurgerConstructorIngredients/BurgerConstructorIngredients";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetailsPopupOpen } = useSelector((state) => state.popupOrder);
  const { ingredientsConstructor, bun } = useSelector(
    (state) => state.constructorItems
  );
  const { userData } = useSelector((state) => state.user);

  const findCard = (id: string) => {
    const ingredientContainer = ingredientsConstructor.filter(
      (c) => c._id === id
    )[0];
    return {
      ingredientContainer,
      index: ingredientsConstructor.indexOf(ingredientContainer),
    };
  };

  const moveCard = (id: string, atIndex: number) => {
    const { ingredientContainer, index } = findCard(id);
    dispatch({
      type: UPDATE_CONSTRUCTOR_ITEM,
      item: update(ingredientsConstructor, {
        $splice: [
          [index, 1],
          [atIndex, 0, ingredientContainer],
        ],
      }),
    });
  };

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
      (sum, ingredient) => sum + ingredient.price,
      0
    );
  }, [ingredientsConstructor]);

  const totalPriceBun = useMemo(() => {
    if (!bun) {
      return 0;
    }
    return bun.price * 2;
  }, [bun]);

  const moveConstructorItem = (item: TIngredient) => {
    dispatch(addConstructorItemAction(...([item] as const)));
  };

  const [{ isHover }, dropTarget] = useDrop<
    TIngredient & { itemId: string },
    unknown,
    { isHover: boolean }
  >({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      moveConstructorItem(itemId);
    },
  });

  const [, drop] = useDrop(() => ({ accept: "card" }));

  function handleCheckout() {
    const ingredientsId = ingredientsConstructor.map(
      (ingredientId) => ingredientId._id
    );
    const buns = new Array(2).fill(bun);
    const dataIds = buns.map((el) => el._id);
    dataIds.splice(1, 0, ...ingredientsId);
    dispatch(postIngredientsConstructorBurger(dataIds));

    if (!userData) {
      navigate(LOGIN_PATH);
    }
  }

  const onDelete = (main: TIngredient) => {
    let myIndex = ingredientsConstructor.indexOf(main);
    if (myIndex !== -1) {
      const chosenIngredientsClone = ingredientsConstructor.slice();
      chosenIngredientsClone.splice(myIndex, 1);
      dispatch({
        type: DELETE_CONSTRUCTOR_ITEM,
        chosenIngredientsClone,
      });
    }
  };

  return (
    <>
      <section
        className={`${styles["burger-constructor"]} ${
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
          <div className={`${styles.scroll}`} ref={drop}>
            {mainsIngredients?.map((main, index) => {
              return (
                <BurgerConstructorIngredients
                  key={`todo-item-${index}`}
                  onDelete={onDelete}
                  id={main._id}
                  index={index}
                  name={main.name}
                  price={main.price}
                  imageMobile={main.image_mobile}
                  main={main}
                  moveCard={moveCard}
                  findCard={findCard}
                />
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
        <TotalPrice
          totalPrice={totalPrice + totalPriceBun}
          handleCheckout={handleCheckout}
        />
      </section>
      {userData && orderDetailsPopupOpen && (
        <Modal>
          <OrderDetails />
          {/* <OrderDetails orderDetailsPopupOpen={orderDetailsPopupOpen} /> */}
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
