import React, { FormEvent, useState } from "react";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { useNavigate } from "react-router-dom";
import { postForgotPasswordAuth } from "../../services/actions/user";

import { LOGIN_PATH, PASSWORD_RESET_PATH } from "../../utils/constants";
import { useDispatch } from "../../services/hooks";

function ForgotPassword() {
  const navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const dispatch = useDispatch();
  const onChangeEmail = (e: FormEvent<EventTarget>) => {
    const valueEmailEvent = (e.target as HTMLInputElement).value;
    setValueEmail(valueEmailEvent);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueEmail) {
      dispatch(postForgotPasswordAuth(valueEmail));
      navigate(PASSWORD_RESET_PATH);
    }
  };

  return (
    <FormAuthentication
      title="Восстановление пароля"
      handleSubmit={handleSubmit}
      button={"Восстановить"}
      text="Вспомнили пароль?"
      linkText="Войти"
      link={LOGIN_PATH}
      method={""}
      formName={""}
      textLogin={""}
      linkEntrance={""}
    >
      <EmailInput
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
