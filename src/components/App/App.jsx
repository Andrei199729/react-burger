import React, { useEffect } from "react";
import "../../index.css";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import OrdersFeed from "../../pages/OrdersFeed/OrdersFeed";
import OrderFeedInfo from "../../pages/OrderFeedInfo/OrderFeedInfo";
import Profile from "../../pages/Profile/Profile";
import OrderInfo from "../../pages/OrderInfo/OrderInfo";
import NotFound404 from "../../pages/NotFound404/NotFound404";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HistoryOrders from "../../pages/HistoryOrders/HistoryOrders";
import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import Modal from "../Modal/Modal";
import { DELETE_INGREDIENT_DATA_MODAL } from "../../services/actions/popupIngredient";
import { getCookie } from "../../utils/cookie";
import { getIngredients } from "../../services/actions/ingredient";
import { getUserData } from "../../services/actions/user";

function App() {
  const { loggedIn, accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(getUserData());
    }
    dispatch(getIngredients());
  }, [dispatch, loggedIn, navigate]);

  function closeAllPopups() {
    dispatch({
      type: DELETE_INGREDIENT_DATA_MODAL,
      ingredientsConstructor,
    });
  }

  const { ingredientsConstructor } = useSelector(
    (state) => state.constructorItems
  );

  const { ingredientDetailsPopupOpen } = useSelector(
    (state) => state.popupIngredient
  );

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/feed" element={<OrdersFeed />} />
        <Route path="/feed/:id" element={<OrderFeedInfo />} />
        <Route
          path="/forgot-password"
          element={
            !loggedIn && !accessToken ? (
              <ForgotPassword />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route path="orders" element={<HistoryOrders />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={<ProtectedRouteElement element={<OrderInfo />} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <>
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                ingredientDetailsPopupOpen && (
                  <Modal onClose={closeAllPopups} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                )
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal onClose={() => navigate("/feed")}>
                  <OrderFeedInfo />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal onClose={() => navigate("/profile/orders")}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
