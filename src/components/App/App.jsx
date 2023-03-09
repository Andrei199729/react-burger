import React, { useEffect, useState } from "react";
import "../../index.css";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import ingredientsApi from "../../utils/ingredientsApi";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen] = useState(false);
  const [isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen] =
    useState(false);

  useState(false);
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

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.keyCode === 27) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);

  return (
    <>
      <AppHeader />
      <Main
        ingredients={ingredients}
        onOrderDetails={() => setIsOrderDetailsPopupOpen(true)}
        onIngredientDetails={() => setIsIngredientDetailsPopupOpen(true)}
      />
      <OrderDetails isOpen={isOrderDetailsPopupOpen} onClose={closeAllPopups} />
      <IngredientDetails
        isOpen={isIngredientDetailsPopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
