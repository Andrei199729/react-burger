import React, { useState } from "react";
import {
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { postRegisterAuth } from "../../services/actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LOGIN_PATH } from "../../utils/constants";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRegisterAuth(nameRegister, emailRegister, passwordRegister));
    setNameRegister("");
    setEmailRegister("");
    setPasswordRegister("");
    navigate(LOGIN_PATH);
  };

  return (
    <FormAuthentication
      title="Регистрация"
      handleSubmit={handleSubmit}
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      linkText="Войти"
      link={LOGIN_PATH}
      method="POST"
      formName="formregister"
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setNameRegister(e.target.value)}
        value={nameRegister}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput
        type={"text"}
        placeholder={"E-mail"}
        onChange={(e) => setEmailRegister(e.target.value)}
        value={emailRegister}
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        placeholder={"Пароль"}
        onChange={(e) => setPasswordRegister(e.target.value)}
        value={passwordRegister}
        name={"password"}
        extraClass="mb-6"
      />
    </FormAuthentication>
  );
}

export default Registration;
