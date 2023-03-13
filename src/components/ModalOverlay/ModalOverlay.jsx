import React from "react";
import styles from "./ModalOverlay.module.css";

function ModalOverlay(props) {
  return (
    <div className={`${styles["modal-overlay"]}`} onClick={props.onClose} />
  );
}

export default ModalOverlay;
