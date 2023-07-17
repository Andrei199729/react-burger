import React from "react";
import styles from "./NotFound404.module.css";
import { Link } from "react-router-dom";

import { MAIN_PATH } from "../../utils/constants";

function NotFound404() {
  return (
    <section className={`${styles.error}`}>
      <p className={`${styles.text} text text_type_digits-large mb-10`}>404</p>
      <Link
        className={`${styles.link} text text_type_main-large`}
        to={MAIN_PATH}
      >
        Назад
      </Link>
    </section>
  );
}

export default NotFound404;
