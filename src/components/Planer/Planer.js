import News from "./News/News";
import Welcome from "./Welcome/Welcome";
import classes from "./Planer.module.css";
import Weather from "./Weather/Weather";
import ToDoList from "./ToDoList/ToDoList";
const Planer = () => {
  return (
    <div className={classes.container}>
      <div className={classes["planer-container"]}>
        <Welcome className={classes.welcome} />
        <ToDoList />
        <News className={classes.news} />

        <Weather className={classes.weather} />
      </div>
    </div>
  );
};

export default Planer;
