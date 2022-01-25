import { useState } from "react";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  const onLogoClickHandler = () => {
    console.log("this is working logo");
  };

  const onDropdownClickHandler = () => {
    console.log("this is working dropdown");
  };

  const onSearchClickHandler = () => {
    console.log("this is working search");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes["nav-actions"]}>
        <ul className={classes["navbar-links"]}>
          <li>
            <Link href="/">Check Writing</Link>
          </li>
          <li>
            <a style={{color: "#ffffff"}} onClick={onDropdownClickHandler}>Grammar</a>
          </li>
          <li>
            <Link href="/">Dictionary</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
