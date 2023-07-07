import React, { useState, useEffect } from "react";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormAuthentication from "../FormAuthentication/FormAuthentication";
import { useNavigate } from "react-router-dom";
import { postResetPasswordAuth } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valuePassword, setValuePassword] = useState("");
  const [valueCode, setValueCode] = useState("");
  const { success } = useSelector((state) => state.user);
  const inputRef = React.useRef(null);
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valueCode && valuePassword) {
      dispatch(postResetPasswordAuth(valuePassword, valueCode));
      navigate("/login");
    }
    if (!success) {
      return navigate("/reset-password");
    }
  };

  return (
    <FormAuthentication
      title="Восстановление пароля"
      handleSubmit={handleSubmit}
      button={"Сохранить"}
      text="Вспомнили пароль?"
      linkText="Войти"
      link="/login"
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
