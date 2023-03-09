import React from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
  return (
    <div
      className={`${props.isOpen ? styles["modal_opened"] : ""} ${
        styles["modal-overlay"]
      } popup_type_${props.name} ${styles["modal_transition"]} `}
      onClick={props.onClose}
    >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default ModalOverlay;
