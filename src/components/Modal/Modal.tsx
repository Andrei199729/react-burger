import React, { FC, useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { postOrderDetailsCloseAction } from "../../services/actions/popupOrder";
import { MAIN_PATH } from "../../utils/constants";
import { useDispatch } from "../../services/hooks";
const modalRoot = document.getElementById("modals");

interface IModal {
  title?: string;
  children: React.ReactNode;
}

const Modal: FC<IModal> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchHome = useMatch(MAIN_PATH);

  const closeModalPath = (path: PathMatch<string> | null) =>
    path ? closeModalDetails : closeModal;
  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };

    const onKeypressDetails = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(postOrderDetailsCloseAction(false));
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
    dispatch(postOrderDetailsCloseAction(false));
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
    modalRoot as HTMLElement
  );
};

export default Modal;
