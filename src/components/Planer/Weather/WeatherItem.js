import classes from "./WeatherItem.module.css"
const WeatherItem = (props) => {
  return (
    <div className={classes.weatherItem}>
      <img src={props.icon} className={classes["weatherItem__icon"]} alt="weather_icon" />
      <div className={classes["weatherItem__desc"]}>
          <p className={classes["weatherItem__hour"]} >{props.hour}:00</p>
          <p>{props.desc}</p>
      </div>
      <p  className={classes["weatherItem__temp"]}>{props.temp}°C</p>
    </div>
  );
};

export default WeatherItem;
