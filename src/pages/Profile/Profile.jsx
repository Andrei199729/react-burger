import React, { useState } from "react";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import HistoryOrders from "../HistoryOrders/HistoryOrders";
import { useDispatch, useSelector } from "react-redux";
import { patchUserData, postLogoutAuth } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";

function Profile() {
  const location = useLocation();
  const locationProfileOrders = location.pathname === "/profile/orders";
  const locationProfile = location.pathname === "/profile";
  const { userData } = useSelector((state) => state.user);
  const [nameProfile, setNameProfile] = useState(userData.user.name);
  const [emailProfile, setEmailProfile] = useState(userData.user.email);
  const [passwordProfile, setPasswordProfile] = useState("******");
  const inputRef = React.useRef(null);
  const accessToken = getCookie("accessToken");
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const onChangeName = (e) => {
    setNameProfile(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmailProfile(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordProfile(e.target.value);
  };
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleCancel = () => {
    setEmailProfile(userData.user.email);
    setNameProfile(userData.user.name);
    setEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      patchUserData(nameProfile, emailProfile, passwordProfile, accessToken)
    );
    setEdit(false);
  };

  const handleLogout = () => {
    const refreshToken = getCookie("refreshToken");
    dispatch(postLogoutAuth(refreshToken));
  };

  function blurHandler(e) {
    switch (e.target.name) {
      case "name":
        setEdit(true);
        break;
      case "email":
        setEdit(true);
        break;
      default:
        break;
    }
  }

  return (
    <section className={`${styles.profile} mt-30`}>
      <div className={`${styles["profile__container"]}`}>
        <div className={`${styles["profile__box"]}`}>
          <nav className={`${styles["profile__nav"]} mr-15`}>
            <div>
              <ul className={`${styles["profile__nav-lists"]}`}>
                <NavLink
                  className={`${
                    locationProfile
                      ? `${styles.active} ${styles.link}`
                      : styles.link
                  } text text_type_main-default`}
                  to="/profile"
                  end
                >
                  Профиль
                </NavLink>
                <NavLink
                  className={`${
                    locationProfileOrders
                      ? `${styles.active} ${styles.link}`
                      : styles.link
                  } text text_type_main-default`}
                  to="orders"
                >
                  История заказов
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? `${styles.active} ${styles.link} `
                        : styles.link
                    } text text_type_main-default`
                  }
                  to="/login"
                  onClick={handleLogout}
                >
                  Выход
                </NavLink>
              </ul>
            </div>
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </nav>
          {!locationProfileOrders ? (
            <form className={`ml-15`} action="/" onSubmit={handleSubmit}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChangeName}
                icon={"EditIcon"}
                value={nameProfile}
                name="name"
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                onIconClick={onIconClick}
                ref={inputRef}
                extraClass="mb-6"
                onBlur={blurHandler}
              />
              <EmailInput
                type={"text"}
                placeholder={"E-mail"}
                onChange={onChangeEmail}
                value={emailProfile}
                name="email"
                isIcon={true}
                extraClass="mb-6"
                onBlur={blurHandler}
              />
              <PasswordInput
                placeholder={"Пароль"}
                onChange={onChangePassword}
                value={passwordProfile}
                name={"password"}
                extraClass="mb-6"
              />
              {edit && (
                <div className={`${styles.buttons} mt-6`}>
                  <Button
                    type="secondary"
                    size="medium"
                    htmlType="button"
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                  <Button type="primary" size="medium" htmlType="submit">
                    Сохранить
                  </Button>
                </div>
              )}
            </form>
          ) : (
            <HistoryOrders />
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
