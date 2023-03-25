import React, { useEffect, useState } from "react";
import "../../index.css";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import ingredientsApi from "../../utils/ingredientsApi";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { IngredientsContext } from "../../services/appContext";

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

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      <AppHeader />
      <Main
        onOrderDetails={() => setIsOrderDetailsPopupOpen(true)}
        onIngredientDetails={() => setIsIngredientDetailsPopupOpen(true)}
        onIngredientsData={(data) => setIngredientsData(data)}
        setOrderBurger={setOrderBurger}
      />
      {isIngredientDetailsPopupOpen && (
        <Modal
          isOpen={isIngredientDetailsPopupOpen}
          onClose={closeAllPopups}
          title="Детали ингредиента"
        >
          <IngredientDetails ingredientsData={ingredientsData} />
        </Modal>
      )}
      {isOrderDetailsPopupOpen && (
        <Modal isOpen={isOrderDetailsPopupOpen} onClose={closeAllPopups}>
          <OrderDetails orderBurger={orderBurger} />
        </Modal>
      )}
    </IngredientsContext.Provider>
  );
}

export default App;
