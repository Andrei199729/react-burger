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

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HistoryOrders from "../../pages/HistoryOrders/HistoryOrders";
import {
  ProtectedRouteElement,
  ProtectedRoute,
} from "../ProtectedRouteElement/ProtectedRouteElement";
import { useDispatch } from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import Modal from "../Modal/Modal";
import { getIngredients } from "../../services/actions/ingredient";
import { checkUserAuth } from "../../services/actions/user";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route
          path="/login"
          element={<ProtectedRouteElement component={<Login />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRouteElement component={<Registration />} />}
        />
        <Route path="/feed" element={<OrdersFeed />} />
        <Route path="/feed/:id" element={<OrderFeedInfo />} />
        <Route
          path="/forgot-password"
          element={<ProtectedRouteElement component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRouteElement component={<ResetPassword />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        >
          <Route path="orders" element={<HistoryOrders />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={<ProtectedRoute component={<OrderInfo />} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <>
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
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
