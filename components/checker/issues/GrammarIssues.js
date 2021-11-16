import GrammarCard from "./GrammarCard";

import classes from "./GrammarIssues.module.css";

const GrammarIssues = (props) => {
  const generateGrammarCards = (issues) => {
    return issues.map((issue) => {
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
    <div className={classes.issues}>
      <div className={classes.text}>
        <label className={classes["issue-label"]}>Issues</label>
        <p className={classes["amt-issue-label"]}>{props.amtIssues}</p>
      </div>
      {generateGrammarCards(props.issues)}
    </div>
  );
};

export default GrammarIssues;
