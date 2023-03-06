import React, { useState } from "react";
import styles from "./AppHeader.module.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const [active, setActive] = useState(false);

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={`${styles.header__burger} pl-5 pb-4 pt-4 pr-5`}>
        <div className={`${styles["header__burger-navigation"]}`}>
          <a className={`${styles["header__burger-link"]} mr-2 pr-5`} href="/">
            <BurgerIcon type={"primary"} />
            <p
              className={`text text_type_main-default ${styles["active-link"]} ml-2`}
            >
              Конструктор
            </p>
          </a>
          <a
            id="2"
            className={`${styles["header__burger-link"]} pl-5 pr-5`}
            href="/"
          >
            <ListIcon type={"secondary"} />
            <p
              className={`text text_type_main-default ${
                active && styles["active-link"]
              } ml-2`}
            >
              Лента заказов
            </p>
          </a>
          <a className={`${styles.logo}`} href="/">
            <Logo />
          </a>
        </div>
        <a className={`${styles["header__burger-link"]} pl-5 pr-5`} href="/">
          <ProfileIcon type={"secondary"} />
          <p
            className={`text text_type_main-default ${
              active && styles["active-link"]
            } ml-2`}
          >
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
