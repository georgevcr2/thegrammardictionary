import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import FilterDropdown from "../ui/FilterDropdown";
import GrammarIssues from "./issues/GrammarIssues";
import ErrorElement from "./editorElements/ErrorElement";
import DefaultElement from "./editorElements/DefaultElement";

import classes from "./GrammarChecker.module.css";

const GrammarChecker = () => {
  const [textboxText, setTextboxText] = useState("");
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const [textLanguage, setTextLanguage] = useState("en-US");
  const [issues, setIssues] = useState([]);
  const editor = useMemo(() => withReact(createEditor()), []);

  useDidMountEffect(() => {
    const data = {
      text: textboxText,
      language: textLanguage,
      rules: {},
    };
    try {
      const delayDebounceFn = setTimeout(async () => {
        const response = await fetch("/api/language", {
          method: "POST",
          body: JSON.stringify(data),
          header: { "Content-Type": "application/json" },
        });

        const grammaticalMistakes = await response.json();
        //console.log("response from api: ", grammaticalMistakes);
        setIssues(grammaticalMistakes.body.issues);
        setValue([...grammaticalMistakes.body.text]);
      }, 2500);

      return () => clearTimeout(delayDebounceFn);
    } catch (err) {
      //error, not network
    }
  }, [textboxText]);

  const handleEditorChange = (evt) => {
    let text = "";
    evt.forEach((ele) =>
      ele.children.forEach((nestEle) => (text += nestEle.text))
    );
    console.log(text);
    if (text !== textboxText) {
      setTextboxText(text);
    }
  };

  const onChangeSelectHandler = (langCode) => {
    setTextLanguage(langCode);
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "error":
        return <ErrorElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    console.log("leaf", props);
    return <Leaf {...props} />;
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes["grammar-textarea"]}>
          <Slate editor={editor} value={value} onChange={handleEditorChange}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some plain text..."
            />
          </Slate>
        </div>
        <GrammarIssues amtIssues={issues.length} issues={issues} />
      </div>
      <div className={classes.buttons}>
        <FilterDropdown onChangeSelect={onChangeSelectHandler} />
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Check out this avatar</Tooltip>}
        >
          <Button variant="primary" className={classes["button-backlink"]}>
            Upgrade to Premium
          </Button>
        </OverlayTrigger>
        <Button variant="primary" className={classes["button-extension"]}>
          Download our free, no signup Chrome extension
        </Button>
      </div>
    </div>
  );
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export default GrammarChecker;
