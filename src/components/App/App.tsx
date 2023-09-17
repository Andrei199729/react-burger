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

import { Routes, Route, useLocation } from "react-router-dom";
import HistoryOrders from "../../pages/HistoryOrders/HistoryOrders";
import {
  Authorized,
  Unauthorized,
} from "../ProtectedRouteElement/ProtectedRouteElement";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import Modal from "../Modal/Modal";
import { getIngredients } from "../../services/actions/ingredient";

import {
  MAIN_PATH,
  INGREDIENTS_ID_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  ORDERS_PATH,
  ORDER_FEED_PATH,
  ORDER_FEED_ID_PATH,
  PASSWORD_RECOVERY_PATH,
  PASSWORD_RESET_PATH,
  PROFILE_ORDERS_ID_PATH,
  PROFILE_PATH,
  ERROR_PATH,
} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import { useDispatch, useSelector } from "../../services/hooks";
import { checkUserAuth } from "../../services/actions/user";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const preloader = useSelector((state) => state.ingredients.preloader);
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return preloader ? (
    <Preloader />
  ) : (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={INGREDIENTS_ID_PATH} element={<IngredientPage />} />
        <Route
          path={LOGIN_PATH}
          element={<Unauthorized component={<Login />} />}
        />
        <Route
          path={REGISTER_PATH}
          element={<Unauthorized component={<Registration />} />}
        />
        <Route path={ORDER_FEED_PATH} element={<OrdersFeed />} />
        <Route path={ORDER_FEED_ID_PATH} element={<OrderFeedInfo />} />
        <Route
          path={PASSWORD_RECOVERY_PATH}
          element={<Unauthorized component={<ForgotPassword />} />}
        />
        <Route
          path={PASSWORD_RESET_PATH}
          element={<Unauthorized component={<ResetPassword />} />}
        />
        <Route
          path={PROFILE_PATH}
          element={<Authorized component={<Profile />} />}
        >
          <Route path={ORDERS_PATH} element={<HistoryOrders />} />
        </Route>
        <Route
          path={PROFILE_ORDERS_ID_PATH}
          element={<Authorized component={<OrderInfo />} />}
        />
        <Route path={ERROR_PATH} element={<NotFound404 />} />
      </Routes>
      {background && (
        <>
          <Routes>
            <Route
              path={INGREDIENTS_ID_PATH}
              element={
                <Modal title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={ORDER_FEED_ID_PATH}
              element={
                <Modal>
                  <OrderFeedInfo />
                </Modal>
              }
            />
            <Route
              path={PROFILE_ORDERS_ID_PATH}
              element={
                <Modal>
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
