import React from "react";
import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loading}>
      <div className={styles.uilRingCss}>
        <div></div>
      </div>
      <div className={styles.loadingTextPrimary}>Please wait...</div>
      <div className={styles.loadingTextSecondary}>Loading...</div>
    </div>
  );
}
