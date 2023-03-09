import React from "react";
import styles from "./IngredientDetails.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";

function IngredientDetails(props) {
  return (
    <Modal
      name="ingredient-modal"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <img
        src="https://code.s3.yandex.net/react/code/meat-01-large.png"
        alt="Краторная булка N-200i"
      />
      <div className={`${styles["mass-ingredient"]} mt-4 mb-15`}>
        <h3 className={`text text_type_main-medium`}>
          Биокотлета из марсианской Магнолии
        </h3>
        <div className={`${styles["mass-ingredient__container"]} mt-8`}>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Калории,ккал
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              244,4
            </p>
          </div>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Белки, г
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              12,2
            </p>
          </div>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Жиры, г
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              17,2
            </p>
          </div>
          <div className={`${styles["mass-ingredient__block"]}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Углеводы, г
            </p>
            <p className={`text text_type_digits-default text_color_inactive`}>
              10,2
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

IngredientDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
