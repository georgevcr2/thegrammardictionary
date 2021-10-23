import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import React from "react";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <div className={classes["page-width"]}>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
