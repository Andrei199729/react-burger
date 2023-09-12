import React, { FC } from "react";
import styles from "./ModalOverlay.module.css";

interface IOnClose {
  onClose: () => void;
}

const ModalOverlay: FC<IOnClose> = (props) => {
  return (
    <div className={`${styles["modal-overlay"]}`} onClick={props.onClose} />
  );
};

export default ModalOverlay;
