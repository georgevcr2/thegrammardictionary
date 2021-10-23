import { useRef, useState, useEffect } from "react";
import * as Scroll from "react-scroll";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./GrammarChecker.module.css";
import FilterDropdown from "../ui/FilterDropdown";
import GrammarCard from "./GrammarCard";

const GrammarChecker = () => {
  const firstRenderRef = useRef(true);
  const [textboxText, setTextboxText] = useState("");
  const [textLanguage, setTextLanguage] = useState("en-US");
  const [amtIssues, setAmtIssues] = useState(0);
  const [issues, setIssues] = useState([]);
  const [textInfo, setTextInfo] = useState({ characters: 0 });

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      const data = {
        text: textboxText,
        language: textLanguage,
        rules: {},
      };
      //console.log(data);
      const delayDebounceFn = setTimeout(() => {
        checkGrammarHandler(data);
      }, 3000);

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
      } else {
        //network error
      }
    } catch (err) {
      //error, not network
    }
  }

  const onChangeTextboxText = (e) => {
    const text = e.target.value;
    const readingTime = require("reading-time");
    let stats = readingTime(text);
    stats = { ...stats, characters: text.replaceAll(" ", "").length };
    setTextInfo(stats);
    setTextboxText(text);
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

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.checker}>
          <Form>
            <Form.Group controlId="textarea">
              <Form.Control
                className={classes["grammar-textarea"]}
                as="textarea"
                rows={16}
                placeholder="Enter or paste your text in here..."
                onChange={onChangeTextboxText}
              />
            </Form.Group>
          </Form>
        </div>
        <div className={classes.issues}>
          <div className={classes.text}>
            <label className={classes["issue-label"]}>Issues</label>
            <p className={classes["amt-issue-label"]}>{amtIssues.toString()}</p>
          </div>
          {generateGrammarCards()}
        </div>
      </div>
      <div className={classes.buttons}>
        <FilterDropdown onChangeSelect={onChangeSelectHandler} />
        <Button variant="primary" className={classes["button-backlink"]}>
          Upgrade to Premium
        </Button>
        <Button variant="primary" className={classes["button-extension"]}>
          Download our free, no signup Chrome extension
        </Button>
      </div>
    </div>
  );
};

export default GrammarChecker;
