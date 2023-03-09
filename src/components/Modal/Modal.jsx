import React from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function Modal(props) {
  return (
    <ModalOverlay
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
    >
      <div
        className={`${styles["modal__container"]} pr-10 pl-10`}
        onClick={(evt) => evt.stopPropagation()}
      >
        {props.name === "ingredient-modal" ? (
          <div className={`${styles["modal__title-ingredient"]} pt-10`}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            <div className={`${styles["btn_cursor"]}`}>
              <CloseIcon type="primary" onClick={props.onClose} />
            </div>
          </div>
        ) : (
          <div className={`${styles["btn_cursor"]} pt-15`}>
            <CloseIcon type="primary" onClick={props.onClose} />
          </div>
        )}
        <div className={`${styles["modal__block"]}`}>{props.children}</div>
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};

export default Modal;
