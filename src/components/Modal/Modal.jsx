import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { POST_ORDER_DETAILS_CLOSE } from "../../services/actions/popupOrder";
import { MAIN_PATH } from "../../utils/constants";

const modalRoot = document.getElementById("modals");

function Modal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchHome = useMatch(MAIN_PATH);

  const closeModalPath = (path) => (path ? closeModalDetails : closeModal);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };

    const onKeypressDetails = (e) => {
      if (e.key === "Escape") {
        dispatch({
          type: POST_ORDER_DETAILS_CLOSE,
        });
      }
    };

    document.addEventListener("keydown", onKeypress);
    document.addEventListener("keydown", onKeypressDetails);

    return () => {
      document.removeEventListener("keydown", onKeypress);
      document.removeEventListener("keydown", onKeypressDetails);
    };
  }, [dispatch, navigate]);

  function closeModal() {
    navigate(-1);
  }

  function closeModalDetails() {
    dispatch({
      type: POST_ORDER_DETAILS_CLOSE,
    });
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
            <CloseIcon type="primary" onClick={closeModalPath(matchHome)} />
          </div>
        </header>
        <div className={`${styles["modal__block"]}`}>{props.children}</div>
      </div>
      <ModalOverlay onClose={closeModalPath(matchHome)} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default Modal;
