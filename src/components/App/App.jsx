import React, { useEffect, useState, useMemo } from "react";
import "../../index.css";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { OrderDetailsPopupOpenContext } from "../../service/orderDetailsPopupOpenContext";
import { IngredientDetailsPopupOpenContext } from "../../service/ingredientDetailsPopupOpenContext";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredient";
import { DELETE_INGREDIENT_DATA_MODAL } from "../../services/actions/ingredient";

function App() {
  const [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen] = useState(false);
  const [isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen] =
    useState(false);

  const dispatch = useDispatch();
  const { ingredientsConstructor } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  function closeAllPopups() {
    setIsIngredientDetailsPopupOpen(false);
    setIsOrderDetailsPopupOpen(false);
    dispatch({
      type: DELETE_INGREDIENT_DATA_MODAL,
      ingredientsConstructor,
    });
  }

  const contextValueOrderDetailsPopupOpen = useMemo(() => {
    return { isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen };
  }, [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen]);

  const contextValueIngredientDetailsPopupOpen = useMemo(() => {
    return { isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen };
  }, [isIngredientDetailsPopupOpen, setIsIngredientDetailsPopupOpen]);

  return (
    <>
      <AppHeader />
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
    </>
  );
}

export default App;
