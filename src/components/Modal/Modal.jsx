import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modals");

function Modal(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [navigate]);

  function closeModal() {
    navigate(-1);
  }

  return createPortal(
    <>
      <div className={`${styles["modal__container"]} pr-10 pl-10`}>
        <header className={`${styles["modal__header"]} pt-15`}>
          {props.title && (
            <h2 className={`${styles.title} text text_type_main-large`}>
              {props.title}
            </h2>
          )}
          <div className={`${styles["btn_cursor"]}`}>
            <CloseIcon type="primary" onClick={closeModal} />
          </div>
        </header>
        <div className={`${styles["modal__block"]}`}>{props.children}</div>
      </div>
      <ModalOverlay onClose={closeModal} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default Modal;
