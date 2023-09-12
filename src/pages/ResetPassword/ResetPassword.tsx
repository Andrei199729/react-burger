import React, { FormEvent, useState } from "react";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { useNavigate } from "react-router-dom";
import { postResetPasswordAuth } from "../../services/actions/user";

import { LOGIN_PATH, PASSWORD_RESET_PATH } from "../../utils/constants";
import { useDispatch, useSelector } from "../../services/hooks";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valuePassword, setValuePassword] = useState("");
  const [valueCode, setValueCode] = useState("");
  const { success } = useSelector((state) => state.user);
  const inputRef = React.useRef(null);
  const onChangePassword = (e: FormEvent<EventTarget>) => {
    const valuePasswordEvent = (e.target as HTMLInputElement).value;
    setValuePassword(valuePasswordEvent);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueCode && valuePassword) {
      dispatch(postResetPasswordAuth(valuePassword, valueCode));
      navigate(LOGIN_PATH);
    }
    if (!success) {
      return navigate(PASSWORD_RESET_PATH);
    }
  };

  return (
    <FormAuthentication
      title="Восстановление пароля"
      handleSubmit={handleSubmit}
      button={"Сохранить"}
      text="Вспомнили пароль?"
      linkText="Войти"
      link={LOGIN_PATH}
      method={""}
      formName={""}
      textLogin={""}
      linkEntrance={""}
    >
      <div>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={onChangePassword}
          value={valuePassword}
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValueCode(e.target.value)}
          value={valueCode}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
      </div>
    </FormAuthentication>
  );
}

export default ResetPassword;
