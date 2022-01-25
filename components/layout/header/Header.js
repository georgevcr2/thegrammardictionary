import classes from "./Header.module.css";
import MainNavigation from "./MainNavigation";

const Header = () => {
  return (
    <div className={classes.header}>
      <MainNavigation />
    </div>
  );
};

export default Header;
