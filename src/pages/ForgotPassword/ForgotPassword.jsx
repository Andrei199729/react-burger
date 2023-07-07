import React, { useState } from "react";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { useNavigate } from "react-router-dom";
import { postForgotPasswordAuth } from "../../services/actions/user";
import { useDispatch } from "react-redux";

function ForgotPassword() {
  const navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valueEmail) {
      dispatch(postForgotPasswordAuth(valueEmail));
      navigate("/reset-password");
    }
  };

  return (
    <FormAuthentication
      title="Восстановление пароля"
      handleSubmit={handleSubmit}
      button={"Восстановить"}
      text="Вспомнили пароль?"
      linkText="Войти"
      link="/login"
    >
      <EmailInput
        type={"text"}
        placeholder={"Укажите e-mail"}
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
      />
    </FormAuthentication>
  );
}

export default ForgotPassword;