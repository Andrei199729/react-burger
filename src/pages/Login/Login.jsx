import React, { useState } from "react";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { useDispatch } from "react-redux";
import { postLoginAuth } from "../../services/actions/user";

import {
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { MAIN_PATH, PASSWORD_RECOVERY_PATH } from "../../utils/constants";

function Login() {
  const dispatch = useDispatch();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");

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
      link={PASSWORD_RECOVERY_PATH}
      linkPath={MAIN_PATH}
      method="POST"
      formName="formlogin"
    >
      <EmailInput
        type={"text"}
        placeholder={"E-mail"}
        onChange={(e) => setValueEmail(e.target.value)}
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
