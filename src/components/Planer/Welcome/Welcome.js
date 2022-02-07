import { useEffect, useState, useInterval } from "react";
import { useSelector } from "react-redux";
import classes from "./Welcome.module.css";
import Card from "../../UI/Card";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Welcome = (props) => {
  const [time, setTime] = useState("");
  const [today, setToday] = useState([]);
  const name = useSelector((state) => state.user.userName);
  const [dayState, setDayState] = useState();

  useEffect(() => {
    setInterval(() => {
      function formatAMPM() {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12; // am pm 1-12
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const strTime = hours + ":" + minutes + " " + ampm;
        setTime(strTime);
        if (ampm === "pm") {
          setDayState("evning");
        } else {
          setDayState("morning");
        }
      }
      formatAMPM();
    }, 1000);
  }, []);

  useEffect(() => {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthDay = date.getDate();

    const dayName = days[day];

    const monthName = months[month];

    setToday({
      day: dayName,
      month: monthName,
      monthDay,
      year,
    });
  }, []);

  const greeting = `Good ${dayState}, ${name}`;
  const dateString = `${today.day}, ${today.monthDay} ${today.month} ${today.year}`;

  return (
    <Card className={props.className}>
      <div className={`${classes["welcome-container"]} `}>
        <p className={classes.greeting}>
          {/* Good {dayState}, <span className={classes.userName}>{name}</span> */}
          {dayState ? greeting : ""}
        </p>
        <div>
          <p className={classes.time}>{time}</p>
          <p className={classes.date}> {dateString}</p>
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
