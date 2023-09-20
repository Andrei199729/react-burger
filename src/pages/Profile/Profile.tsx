import React, { ChangeEvent, FormEvent, FocusEvent, useState, FC } from "react";
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
import { patchUserData, postLogoutAuth } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";

import {
  LOGIN_PATH,
  ORDERS_PATH,
  PROFILE_PATH,
  PROFILE_ORDERS_PATH,
  accessToken,
} from "../../utils/constants";
import { useDispatch, useSelector } from "../../services/hooks";

const Profile: FC = () => {
  const location = useLocation();
  const locationProfileOrders = location.pathname === PROFILE_ORDERS_PATH;
  const locationProfile = location.pathname === PROFILE_PATH;
  const { userData, password } = useSelector((state) => state.user);
  const user = (data: any) => (userData === null ? null : data);
  const [nameProfile, setNameProfile] = useState(user(userData?.user.name));
  const [emailProfile, setEmailProfile] = useState(user(userData?.user.email));
  const [passwordProfile, setPasswordProfile] = useState(password);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameProfile(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailProfile(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordProfile(e.target.value);
  };
  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef && inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const handleCancel = () => {
    setEmailProfile(user(userData?.user.email));
    setNameProfile(user(userData?.user.name));
    setEdit(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

  function blurHandler(e: FocusEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "name":
        setEdit(true);
        break;
      case "email":
        setEdit(true);
        break;
      case "password":
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
                  to={PROFILE_PATH}
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
                  to={ORDERS_PATH}
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
                  to={LOGIN_PATH}
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
                onBlur={blurHandler}
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
};

export default Profile;
