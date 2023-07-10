import React, { useState } from "react";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { useDispatch } from "react-redux";
import { postLoginAuth } from "../../services/actions/user";

import {
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Login() {
  const dispatch = useDispatch();
  const [valueEmail, setValueEmail] = useState("");

  const [valuePassword, setValuePassword] = useState("");

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setValueEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postLoginAuth(valueEmail, valuePassword));
  };

  return (
    <FormAuthentication
      title="Вход"
      handleSubmit={handleSubmit}
      button="Войти"
      textLogin="Вы — новый пользователь?"
      linkEntrance="Зарегистрироваться"
      text="Забыли пароль?"
      linkText="Восстановить пароль"
      link="/forgot-password"
      linkPath="/"
      method="POST"
      formName="formlogin"
    >
      <EmailInput
        type={"text"}
        placeholder={"E-mail"}
        onChange={handleChangeEmail}
        value={valueEmail}
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        placeholder={"Пароль"}
        onChange={(e) => setValuePassword(e.target.value)}
        value={valuePassword}
        name={"password"}
        extraClass="mb-6"
      />
    </FormAuthentication>
  );
}

export default Login;
