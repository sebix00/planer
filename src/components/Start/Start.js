import classes from "./Start.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/user";
import { useSelector } from "react-redux";
import spinner from "../../assets/loadingSpiner.gif"
import Button from "../UI/Button";
import Planer from "../Planer/Planer";

const Start = () => {
  const userName = useSelector((state) => state.user.userName);
  const userCity = useSelector((state) => state.user.userCity);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const [isValidForm, setIsValidForm] = useState(false);


  const dispatch = useDispatch();
  const userNameHandler = (event) => {
    dispatch(userAction.handleName(event.target.value));
  };
  const ucerCityHandler = (event) => {
    dispatch(userAction.handleCity(event.target.value));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (userName.trim() === "") {
      setError("The name cannot be empty");
      setIsLoading(false);
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${process.env.REACT_APP_API_KEY_WEATHER}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.cod === "404" || data.cod === "400") {
            setTimeout(() => {
              setError("There is no such a city. Please enter vlaid city name");
              setIsLoading(false);
            });
          } else {
            setTimeout(() => {
              setIsValidForm(true);
            });
            localStorage.setItem("userName", userName);
            localStorage.setItem("userCity", userCity);
          }
        })
        .catch(() => {
          alert("error");
        });
    }
  };

  return isValidForm ? (
    <Planer />
  ) : (
    <div className={classes["start-container"]}>
      <div className={classes["start__input-box"]}>
        <h1 className={classes["box-title"]}>
          Welcome to{" "}
          <span className={classes["title-color"]}>Daily Dashboard! </span>
        </h1>
        <h2 className={classes["box-sub-title"]}>Please enter your name </h2>
        <form onSubmit={submitHandler}>
          <div className={classes["inputs"]}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={userNameHandler}
              value={userName}
            />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              onChange={ucerCityHandler}
              value={userCity}
            />
          </div>
          <div>{error}</div>
          {isLoading ? (
            <img src={spinner} />
          ) : (
            <Button type="submit" className={classes.btn}>
              Submit
            </Button>
          )}
          {/* <button>Submit</button> */}
        </form>
      </div>
    </div>
  );
};

export default Start;
