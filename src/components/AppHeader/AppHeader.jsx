import React from "react";
import styles from "./AppHeader.module.css";
import { NavLink, useMatch } from "react-router-dom";

import {
  MAIN_PATH,
  INGREDIENTS_ID_PATH,
  ORDER_FEED_PATH,
  ORDER_FEED_ID_PATH,
  PROFILE_ORDERS_ID_PATH,
  PROFILE_PATH,
  PROFILE_ORDERS_PATH,
} from "../../utils/constants";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const matchHome = useMatch(MAIN_PATH);
  const matchHomeIngredients = useMatch(INGREDIENTS_ID_PATH);
  const matchList = useMatch(ORDER_FEED_PATH);
  const matchListId = useMatch(ORDER_FEED_ID_PATH);
  const matchProfile = useMatch(PROFILE_PATH);
  const matchProfileOrders = useMatch(PROFILE_ORDERS_PATH);
  const matchProfileOrdersId = useMatch(PROFILE_ORDERS_ID_PATH);
  const iconType = (path) => (path ? "primary" : "secondary");
  return (
    <header
      className={`${styles.header} pb-4 pt-4 ${matchListId ? "mb-30" : null}`}
    >
      <nav className={`${styles.header__burger} pl-5 pb-4 pt-4 pr-5`}>
        <div className={`${styles["header__burger-navigation"]}`}>
          <NavLink
            className={({ isActive }) =>
              isActive || matchHomeIngredients
                ? `${styles["header__burger-link"]} ${styles["active-link"]} mr-2 pr-5`
                : `${styles["header__burger-link"]} mr-2 pr-5`
            }
            to={MAIN_PATH}
          >
            <BurgerIcon type={iconType(matchHome || matchHomeIngredients)} />
            <p className={`text text_type_main-default ml-2`}>Конструктор</p>
          </NavLink>
          <NavLink
            id="2"
            to={ORDER_FEED_PATH}
            className={({ isActive }) =>
              isActive
                ? `${styles["header__burger-link"]} ${styles["active-link"]} pl-5 pr-5`
                : `${styles["header__burger-link"]} pl-5 pr-5`
            }
          >
            <ListIcon type={iconType(matchList || matchListId)} />
            <p className={`text text_type_main-default ml-2`}>Лента заказов</p>
          </NavLink>
          <a className={`${styles.logo}`} href={MAIN_PATH}>
            <Logo />
          </a>
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles["header__burger-link"]} ${styles["active-link"]} pl-5 pr-5`
              : `${styles["header__burger-link"]} pl-5 pr-5`
          }
          to={PROFILE_PATH}
        >
          <ProfileIcon
            type={iconType(
              matchProfile || matchProfileOrders || matchProfileOrdersId
            )}
          />
          <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
