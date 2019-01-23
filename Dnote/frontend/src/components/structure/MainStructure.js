import React from "react";
// import styles from "./MainStructure.scss";
// import classNames from "classnames/bind";
import Header from "components/structure/Header";

// const cx = classNames.bind(styles);

const MainStructure = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);

export default MainStructure;