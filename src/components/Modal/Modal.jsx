import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modals");

function Modal(props) {
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [props]);

  return createPortal(
    <>
      <div
        className={`${styles["modal__container"]} popup_type_${props.name} pr-10 pl-10`}
      >
        {props.name === "ingredient-modal" ? (
          <header className={`${styles["modal__title-ingredient"]} pt-10`}>
            {props.title && (
              <h2 className="text text_type_main-large">{props.title}</h2>
            )}
            <div className={`${styles["btn_cursor"]}`}>
              <CloseIcon type="primary" onClick={props.onClose} />
            </div>
          </header>
        ) : (
          <div className={`${styles["btn_cursor"]} pt-15`}>
            <CloseIcon type="primary" onClick={props.onClose} />
          </div>
        )}
        <div className={`${styles["modal__block"]}`}>{props.children}</div>
      </div>
      <ModalOverlay onClose={props.onClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
