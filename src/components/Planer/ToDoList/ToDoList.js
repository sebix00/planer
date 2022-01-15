import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Task from "./Task";
import classes from "./ToDoList.module.css";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const defaultTaskState = {
  tasks: [],
  errorMessage: "",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingTask = state.tasks.some(
        (taks) => taks.content === action.task
      );
      console.log(existingTask);
      let error = "";
      let tasks;
      const id = uuidv4();

      if (existingTask) {
        error = "This task is already on the list";
        tasks = [...state.tasks];
      } else if (state.tasks.length > 10) {
        error = "You've reach already max number of task";
        tasks = [...state.tasks];
      } else if (action.task.length < 3) {
        error = "Please write min 3 character";
        tasks = [...state.tasks];
      } else {
        const taskToList = { content: action.task, id, cross: false };
        tasks = state.tasks.concat(taskToList);
      }
      return {
        tasks,
        errorMessage: error,
      };
    }
    case "REMOVE": {
      const updateItems = state.tasks.filter((item) => item.id !== action.id);
      return {
        tasks: updateItems,
        errorMessage: "",
      };
    }
    case "CROSS": {
      const updateTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.id
      );
      const task = state.tasks[updateTaskIndex];
      const updateTask = {
        ...task,
        cross: !task.cross,
      };
      let updateTasks = [...state.tasks];
      updateTasks[updateTaskIndex] = updateTask;
      return {
        tasks: updateTasks,
        errorMessage: "",
      };
    }

    default: {
      return defaultTaskState;
    }
  }
};

const DUMMY_TASK = [
  { task: "Go to gym" },
  { task: "Go to swim" },
  { task: "Go to party" },
  { task: "Go to gym and red a book" },
  { task: "Go to party" },
  { task: "Go to gym and red a book" },
];
const ToDoList = (props) => {
  const [tasksState, dispatchTaksAction] = useReducer(
    taskReducer,
    defaultTaskState
  );

  const [userInput, setUserInput] = useState("");

  const addTaskHandler = (task) => {
    dispatchTaksAction({ type: "ADD", task });
  };
  const removeTaskHandler = (id) => {
    dispatchTaksAction({ type: "REMOVE", id });
  };
  const corssHandler = (id)=>{
      dispatchTaksAction({type:"CROSS",id})
      
}
  const userInputHandler = (event) => {
    setUserInput(event.target.value);
  };
  
  const submitForm = (event) => {
    event.preventDefault();
    addTaskHandler(userInput);
    setUserInput("");
  };
  const taskElement =
    tasksState.tasks.length > 0
      ? tasksState.tasks.map((task) => (
          <Task task={task.content} onRemove={removeTaskHandler} id={task.id} isCrossed={task.cross} onCross={corssHandler} />
        ))
      : <h1 className={classes.firstTask}>Please enter your first task</h1>;

  return (
    <Card>
      <div className={classes.list}>
        <form onSubmit={submitForm}>
          <input
            placeholder="Please enter a task"
            onChange={userInputHandler}
            value={userInput}
          />
          <Button type="onSubmit"> Add task</Button>
          <div>{tasksState.errorMessage}</div>
        </form>
        {taskElement}
      </div>
    </Card>
  );
};
export default ToDoList;
