import News from "./News/News";
import Welcome from "./Welcome/Welcome";
import classes from "./Planer.module.css";
import Weather from "./Weather/Weather";
import ToDoList from "./ToDoList/ToDoList";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/user";

const Planer = () => {
  const dispatch = useDispatch();

  if (localStorage.userCity) {
    dispatch(userAction.handleCity(localStorage.getItem("userCity")));
    dispatch(userAction.handleName(localStorage.getItem("userName")));
  }
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
