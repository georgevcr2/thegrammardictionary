import React, { useRef, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Form from "react-bootstrap/Form";
import { Editor } from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import classes from "./GrammarChecker.module.css";
import FilterDropdown from "../ui/FilterDropdown";
import GrammarCard from "./issues/GrammarCard";
import InputTextbox from "./input/InputTextbox";
import GrammarIssues from "./issues/GrammarIssues";

const GrammarChecker = () => {
  const firstRenderRef = useRef(true);
  const [textboxText, setTextboxText] = useState("");
  const [onTextChange, setOnTextChange] = useState(false);
  const [textLanguage, setTextLanguage] = useState("en-US");
  const [amtIssues, setAmtIssues] = useState(0);
  const [issues, setIssues] = useState([]);
  const [textInfo, setTextInfo] = useState({ characters: 0 });

  useEffect(() => {
    console.log("im changing");
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      console.log("sending request");
      const data = {
        text: textboxText,
        language: textLanguage,
        rules: {},
      };
      //console.log(data);
      const delayDebounceFn = setTimeout(() => {
        checkGrammarHandler(data);
      }, 2500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [textboxText]);

  async function checkGrammarHandler(data) {
    try {
      const response = await fetch("/api/language", {
        method: "POST",
        body: JSON.stringify(data),
        header: { "Content-Type": "application/json" },
      });

      const grammaticalMistakes = await response.json();
      //console.log("response from api: ", grammaticalMistakes);
      if (response.ok) {
        setAmtIssues(+grammaticalMistakes.body.issueAmount);
        setIssues(grammaticalMistakes.body.allIssues);
        let newJSXString = "";
        grammaticalMistakes.body.allIssues.forEach((ele, index, arr) => {
          const nextStart = ele.offset + ele.length;
          const errorText = textboxText.substring(ele.offset, nextStart);
          let remainderText = "";
          if (arr[index + 1] !== undefined) {
            remainderText = textboxText.substring(
              nextStart,
              arr[index + 1].offset
            );
          } else {
            remainderText = textboxText.substring(
              nextStart,
              textboxText.length
            );
          }
          newJSXString =
            newJSXString +
            `<span class=${classes["initial-error"]}>${errorText}</span>`;
          if (remainderText !== 0) {
            newJSXString = newJSXString + remainderText;
          }
        });
        console.log(newJSXString);
        setTextboxText(newJSXString);
      } else {
        //network error
      }
    } catch (err) {
      //error, not network
    }
  }

  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const onChangeTextboxText = (text) => {
    const readingTime = require("reading-time");
    let stats = readingTime(text);
    stats = { ...stats, characters: text.replaceAll(" ", "").length };
    setTextInfo(stats);
    setTextboxText(removeTags(text));
    setOnTextChange((prev) => !prev);
  };

  const onChangeSelectHandler = (langCode) => {
    setTextLanguage(langCode);
  };

  const generateGrammarCards = () => {
    return issues.map((issue, index) => {
      return (
        <GrammarCard
          key={issue.id}
          title={issue.title}
          description={issue.description}
          replacements={issue.replacements}
        />
      );
    });
  };

  const handleEditorChange = (evt) => {
    setTextboxText(evt.target.getContent());
  }

  const editorSetup = (editor) => {
    //https://www.tiny.cloud/docs-4x/advanced/creating-a-custom-button/
    function removeAllText() {
      editor.setContent(<p></p>);
    }

    editor.ui.registry.addButton("removealltext", {
      icon: "insertdatetime",
      image:
        "http://p.yusukekamiyamane.com/icons/search/fugue/icons/calendar-blue.png",
      tooltip: "Removes all text",
      text: "Delete",
      onAction: removeAllText,
    });
  };

  return (
    <div>
      <div className={classes.container}>
        <Editor
          initialValue=""
          apiKey="06yzfag3nuillnn8xmvcjewhbupow10u5qzbt07utanr21w3"
          init={{
            selector: "#tinyeditor",
            height: 500,
            menubar: false,
            branding: false,
            resize: false,
            placeholder: "Some placeholder text...",
            plugins: ["wordcount"],
            toolbar: "copy removealltext",
            setup: editorSetup,
          }}
          onChange={handleEditorChange}
        />
        <GrammarIssues
          amtIssues={amtIssues.toString()}
          generateGrammarCards={generateGrammarCards}
        />
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

export default GrammarChecker;
