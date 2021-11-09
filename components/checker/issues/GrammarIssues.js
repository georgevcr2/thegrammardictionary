import classes from './GrammarIssues.module.css'

const GrammarIssues = (props) => {
  return (
    <div className={classes.issues}>
      <div className={classes.text}>
        <label className={classes["issue-label"]}>Issues</label>
        <p className={classes["amt-issue-label"]}>{props.amtIssues}</p>
      </div>
      {props.generateGrammarCards()}
    </div>
  );
};

export default GrammarIssues;