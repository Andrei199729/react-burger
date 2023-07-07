import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import HistoryOrders from "../HistoryOrders/HistoryOrders";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  patchUserData,
  postLogoutAuth,
} from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";

function Profile(props) {
  const location = useLocation();
  const locationProfileOrders = location.pathname === "/profile/orders";
  const locationProfile = location.pathname === "/profile";
  const [nameProfile, setNameProfile] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [passwordProfile, setPasswordProfile] = useState("******");
  const inputRef = React.useRef(null);
  const accessToken = getCookie("accessToken");
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // setPasswordProfile(userData.user.password);
  };
  useEffect(() => {
    if (userData) {
      setEmailProfile(userData.user.email);
      setNameProfile(userData.user.name);
      // setPasswordProfile(userData.user.password);
    } else {
      dispatch(getUserData());
      navigate("/profile");
    }
  }, [dispatch, userData, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      patchUserData(nameProfile, emailProfile, passwordProfile, accessToken)
    );
  };

  const handleLogout = () => {
    const refreshToken = getCookie("refreshToken");
    dispatch(postLogoutAuth(refreshToken));
  };

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
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                onIconClick={onIconClick}
                ref={inputRef}
                extraClass="mb-6"
              />
              <EmailInput
                type={"text"}
                placeholder={"E-mail"}
                onChange={onChangeEmail}
                value={emailProfile}
                name={"email"}
                isIcon={true}
                extraClass="mb-6"
              />
              <PasswordInput
                placeholder={"Пароль"}
                onChange={onChangePassword}
                value={passwordProfile}
                name={"password"}
                extraClass="mb-6"
              />
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