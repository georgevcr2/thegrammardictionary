import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import allLanguages from "./languages-codes";

import classes from "./FilterDropdown.module.css";

const FilterDropdown = (props) => {
  const generateLanguages = () => {
    const langaugesArr = [];
    let count = 0;
    allLanguages.forEach((ele) => {
      if (ele.code === "---")
        langaugesArr.push(
          <optgroup label="---" key={"opt-" + count}></optgroup>
        );
      else {
        if (ele.longCode === "en-US") {
          langaugesArr.push(
            <option defaultValue value={ele.longCode} key={count}>
              {ele.name}
            </option>
          );
        } else {
          langaugesArr.push(
            <option value={ele.longCode} key={count}>
              {ele.name}
            </option>
          );
        }
      }
      count++;
    });
    return langaugesArr;
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
      >
        {generateLanguages()}
      </select>
    </div>
  );
};

export default FilterDropdown;
