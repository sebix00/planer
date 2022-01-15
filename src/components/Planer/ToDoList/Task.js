import { BsTrash } from "react-icons/bs";

import classes from "./Task.module.css";
const Task = (props) => {
  return (
    <div
      className={
        props.isCrossed
          ? `${classes.task} ${classes.cross}`
          : `${classes.task}`
      }
      onClick={(event) => {
        props.onCross(props.id);
        console.log("click")
        // event.stopPropagation()
      }}
    >
      <p>{props.task}</p>
      <div>
      <button
        onClick={(event) => {
          props.onRemove(props.id);
          console.log(props.id);
          event.stopPropagation()
        }} className={classes["remove-btn"]}
      >
        <BsTrash />
      </button>

      </div>
     
    </div>
  );
};

export default Task;
