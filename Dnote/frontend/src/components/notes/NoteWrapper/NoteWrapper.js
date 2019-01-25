import React from "react";
import styles from "./NoteWrapper.module.scss";

const NoteWrapper = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

export default NoteWrapper;
