import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import useDrag from "./useDrag";

import classes from "./GrammarCard.module.css";

const scrollVisibilityApiType = React.createContext(VisibilityContext);

function onWheel(apiObj, ev) {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }
  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const GrammarCard = (props) => {
  //console.log("all corrections: ", props.replacements);
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });
      
  return (
    <div className={classes.card}>
      <label className={classes["rule-name"]}>{props.title}</label>
      <p className={classes["rule-description"]}>{props.description}</p>
      <div onMouseLeave={dragStop}>
        <ScrollMenu
          onWheel={onWheel}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
        >
          {props.replacements.map((rep, index) => {
            return (
              <p
                key={rep.value}
                className={classes.replacements}
                onClick={() => console.log(rep.value + " has been clicked")}
              >
                {rep.value}
              </p>
            );
          })}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default GrammarCard;
