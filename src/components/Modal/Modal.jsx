import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_INGREDIENT_DATA_MODAL } from "../../services/actions/ingredient";

const modalRoot = document.getElementById("modals");

function Modal(props) {
  const { ingredientsConstructor } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Escape") {
        props.onClose();
        dispatch({
          type: DELETE_INGREDIENT_DATA_MODAL,
          ingredientsConstructor,
        });
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [dispatch, ingredientsConstructor, props]);

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
            <CloseIcon type="primary" onClick={props.onClose} />
          </div>
        </header>
        <div className={`${styles["modal__block"]}`}>{props.children}</div>
      </div>
      <ModalOverlay onClose={props.onClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default Modal;
