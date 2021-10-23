import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import classes from "./GrammarCard.module.css";

const GrammarCard = (props) => {
    console.log("all corrections: ", props.replacements);
  return (
    <div className={classes.card}>
      <label className={classes["rule-name"]}>{props.title}</label>
      <p className={classes["rule-description"]}>{props.description}</p>
    </div>
  );
};

export default GrammarCard;
