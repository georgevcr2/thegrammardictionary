import classes from "./Layout.module.css";
import React from "react";
import Footer from "./Footer";
import Header from "./header/Header";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <Header />
      <div className={classes["page-width"]}>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
