import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import allLanguages from "./languages-codes";

import classes from "./FilterDropdown.module.css";

const FilterDropdown = (props) => {
  const generateLanguages = () => {
    const langaugesArr = [];
    let count = 0;
    return allLanguages.map((ele) => {
      if (ele.code === "---")
        return <optgroup label="---" key={"opt-" + ele.key}></optgroup>;
      else {
        return (
          <option value={ele.longCode} key={ele.longCode}>
            {ele.name}
          </option>
        );
      }
    });
  };

  const onChangeSelectHandler = (e) => {
    props.onChangeSelect(e.target.value);
  };

  return (
    <div>
      <select
        name="language"
        onChange={onChangeSelectHandler}
        className={classes.dropdown}
        value="en-US"
      >
        {generateLanguages()}
      </select>
    </div>
  );
};

export default FilterDropdown;
