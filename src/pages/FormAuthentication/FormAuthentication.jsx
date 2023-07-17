import React from "react";
import styles from "./FormAuthentication.module.css";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { LOGIN_PATH, REGISTER_PATH } from "../../utils/constants";

function FormAuthentication(props) {
  const location = useLocation();
  const loginLocation = location.pathname === LOGIN_PATH;
  return (
    <>
      <div className={`${styles.authentication}`}>
        <div className={`${styles["authentication__container"]}`}>
          <h2
            className={`${styles["authentication__title"]} text text_type_main-medium`}
          >
            {props.title}
          </h2>
          <form
            className={`${styles.form} mb-20 mt-6`}
            onSubmit={props.handleSubmit}
            action="/"
            method={props.method}
            name={props.formName}
          >
            {props.children}
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.buttonSize}
            >
              {props.button}
            </Button>
          </form>
          <div className={`${styles["authentication-route"]}`}>
            {loginLocation && (
              <p className={`text text_type_main-small mb-4`}>
                {props.textLogin}
                <Link className={`${styles.linkSign} ml-2`} to={REGISTER_PATH}>
                  {props.linkEntrance}
                </Link>
              </p>
            )}
            <p className={`text text_type_main-small mb-4`}>
              {props.text}
              <Link className={`${styles.linkSign} ml-2`} to={props.link}>
                {props.linkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

FormAuthentication.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  method: PropTypes.string,
  formName: PropTypes.string,
  children: PropTypes.node,
  button: PropTypes.string.isRequired,
  textLogin: PropTypes.string,
  text: PropTypes.string.isRequired,
  linkEntrance: PropTypes.string,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default FormAuthentication;
