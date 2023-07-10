import React, { useMemo } from "react";
import styles from "./BurgerConstructor.module.css";
import { useSelector, useDispatch } from "react-redux";

import {
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_CONSTRUCTOR_ITEM,
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

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { orderDetailsPopupOpen } = useSelector((state) => state.popupOrder);
  const { ingredientsConstructor, bun } = useSelector(
    (state) => state.constructorItems
  );
  const { isAuthloggedIn } = useSelector((state) => state.user);

  const findCard = (id) => {
    const ingredientContainer = ingredientsConstructor.filter(
      (c) => c._id === id
    )[0];
    return {
      ingredientContainer,
      index: ingredientsConstructor.indexOf(ingredientContainer),
    };
  };

  const moveCard = (id, atIndex) => {
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

  const moveConstructorItem = (item) => {
    dispatch({ type: ADD_CONSTRUCTOR_ITEM, ...item });
  };

  const [{ isHover }, dropTarget] = useDrop({
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
    const ingredientsId = ingredients?.map((ingredientId) => ingredientId._id);
    dispatch(postIngredientsConstructorBurger(ingredientsId));
    if (!isAuthloggedIn) {
      navigate("/login");
    }
  }

  const onDelete = (main) => {
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

  function closeAllPopups() {
    navigate(-1);
  }

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
            {(bun || undefined || null) && (
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
      {orderDetailsPopupOpen && (
        <Modal onClose={closeAllPopups}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
