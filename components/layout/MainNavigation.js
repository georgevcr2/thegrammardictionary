import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import classes from "./MainNavigation.module.css";

import logo from "../../images/tgdLogo.png";
import logoLarge from "../../images/tgdLargeLogo.png";

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
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Image
            src={logoLarge}
            alt="logo"
            layout="fixed"
            width="244.02px"
            height="104.82px"
            className={classes["logo-image"]}
            onClick={onLogoClickHandler}
          />
        </div>
        <div className={classes["nav-actions"]}>
          <Form className={classes["header-form"]}>
            <Form.Group
              className="mb-3"
              controlId="searchbar"
              style={{ position: "relative" }}
            >
              <Form.Control
                type="search"
                placeholder=""
                className={classes.searchbar}
              />
              <Button variant="primary" className={classes["search-button"]}>
                search
              </Button>
            </Form.Group>
          </Form>
          <ul className={classes["navbar-links"]}>
            <li>
              <Link href="/">Check Writing</Link>
            </li>
            <li>
              <a onClick={onDropdownClickHandler}>Grammar</a>
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
    </header>
  );
};

export default MainNavigation;
