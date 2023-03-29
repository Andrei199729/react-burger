import React, { useEffect, useState, useMemo } from "react";
import "../../index.css";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import ingredientsApi from "../../utils/ingredientsApi";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { IngredientsContext } from "../../services/appContext";
import { OrderBurgerContext } from "../../services/orderBurgerContext";
import { IngredientsDataContext } from "../../services/ingredientsDataContext";
import { OrderDetailsPopupOpenContext } from "../../services/orderDetailsPopupOpenContext";
import { IngredientDetailsPopupOpenContext } from "../../services/ingredientDetailsPopupOpenContext";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen] = useState(false);
  const [isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen] =
    useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [orderBurger, setOrderBurger] = useState([]);

  useEffect(() => {
    fetch(ingredientsApi)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject("something wrong");
        }
      })
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен", err);
      });
  }, []);

  function closeAllPopups() {
    setIsIngredientDetailsPopupOpen(false);
    setIsOrderDetailsPopupOpen(false);
  }

  const contextValueIngredients = useMemo(() => {
    return { ingredients, setIngredients };
  }, [ingredients, setIngredients]);

  const contextValueOrderBurger = useMemo(() => {
    return { orderBurger, setOrderBurger };
  }, [orderBurger, setOrderBurger]);

  const contextValueIngredientsData = useMemo(() => {
    return { ingredientsData, setIngredientsData };
  }, [ingredientsData, setIngredientsData]);

  const contextValueOrderDetailsPopupOpen = useMemo(() => {
    return { isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen };
  }, [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen]);

  const contextValueIngredientDetailsPopupOpen = useMemo(() => {
    return { isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen };
  }, [isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen]);

  return (
    <>
      <AppHeader />
      <IngredientsContext.Provider value={contextValueIngredients}>
        <OrderBurgerContext.Provider value={contextValueOrderBurger}>
          <IngredientsDataContext.Provider value={contextValueIngredientsData}>
            <OrderDetailsPopupOpenContext.Provider
              value={contextValueOrderDetailsPopupOpen}
            >
              <IngredientDetailsPopupOpenContext.Provider
                value={contextValueIngredientDetailsPopupOpen}
              >
                <Main />
                {isIngredientDetailsPopupOpen && (
                  <Modal onClose={closeAllPopups} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                )}
                {isOrderDetailsPopupOpen && (
                  <Modal onClose={closeAllPopups}>
                    <OrderDetails />
                  </Modal>
                )}
              </IngredientDetailsPopupOpenContext.Provider>
            </OrderDetailsPopupOpenContext.Provider>
          </IngredientsDataContext.Provider>
        </OrderBurgerContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
