import GrammarChecker from "../components/checker/GrammarChecker";
import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={classes["h1-text"]}>Instantly Improve Your Writing</h1>
      <h2 className={classes["h2-text"]}>
        Get multilingual grammar, style, and spell checker feedback on your
        writing
      </h2>
      <GrammarChecker />
    </div>
  );
}
