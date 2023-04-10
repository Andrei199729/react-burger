import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  return (
    <div className={`${styles["modal-overlay"]}`} onClick={props.onClose} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
