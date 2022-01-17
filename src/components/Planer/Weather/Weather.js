import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../UI/Card";
import classes from "./Weather.module.css";
import WeatherItem from "./WeatherItem";
import { WiBarometer, WiHumidity, WiStrongWind } from "react-icons/wi";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineChangeCircle } from "react-icons/md";


const kelvinToCelcius = (value) => Math.round(parseFloat(value) - 273.15);
const toKm = (value) => value * (3.6).toFixed(2);
const getHour = (unix) => {
  const date = new Date(unix * 1000);
  return date.getHours() + 1;
};
const getIcon = (id = "04n") =>
  ` https://openweathermap.org/img/wn/${id}@2x.png`;

const Weather = (props) => {
  const cityValue = useSelector((state) => state.user.userCity);
  const [weatherConditions, setWeatherConditions] = useState({
    temp: "",
    desc: "",
    rain: "",
    pressure: "",
    wind: "",
    icon: "",
  });
  const [hourWeather, setHourWeather] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityValue +
        "&appid=" +
        process.env.REACT_APP_API_KEY_WEATHER
    )
      .then((resp) => resp.json())
      .then((data) => {
        const lat = data.coord.lat;
        const long = data.coord.lon;
        getWeather(lat, long);
      })
      .catch((error) => console.error(error));
  }, []);

  const getWeather = (lat, lon) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude={daily}&appid=" +
        process.env.REACT_APP_API_KEY_WEATHER
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setWeatherConditions({
          temp: kelvinToCelcius(data.current.temp),
          desc: data.current.weather[0].description,
          feels: kelvinToCelcius(data.current.feels_like),
          pressure: data.current.pressure,
          wind: toKm(data.hourly[0].wind_speed),
          humidity: data.current.humidity,
          icon: data.current.weather[0].icon,
        });

        setHourWeather(
          data.hourly.filter((element) => data.hourly.indexOf(element) < 5)
        );
      });
  };

  const currentWeather = (
    <div className={classes.currentWeather}>
      <div className={classes["currentWeather__info"]}>
        <h1>{cityValue}</h1>
        <button
          onClick={() => {
            localStorage.removeItem("userCity");
            window.location.reload(true);
          }}
          className={classes["btn-change-city"]}
        >
          <MdOutlineChangeCircle />
        </button>
        <img
          src={getIcon(weatherConditions.icon ? weatherConditions.icon : "02d")}
          className={classes["currentWeather__icon"]}
        />
        
      </div>

      <div className={classes["currentWeather__main"]}>
        <p className={classes["currentWeather__main-temp"]}>
          {weatherConditions.temp} °C
        </p>
        <p>{weatherConditions.desc}</p>
      </div>
    </div>
  );

  const details = (
    <div className={classes["currentWeather__details"]}>
      {/* WiBarometer, WiHumidity, WiStrongWind */}
      <div className={classes["grid-cel"]}>
        <WiBarometer className={classes["currentWeather__details-icon"]} />
        <div className={classes["currentWeather_details-info"]}>
          <p>Air Pressure</p>
          <p>{weatherConditions.pressure}</p>
        </div>
      </div>
      <div className={classes["grid-cel"]}>
        <WiHumidity className={classes["currentWeather__details-icon"]} />
        <div className={classes["currentWeather_details-info"]}>
          <p>Humidity</p>
          <p>{weatherConditions.humidity}%</p>
        </div>
      </div>
      <div className={classes["grid-cel"]}>
        <WiStrongWind className={classes["currentWeather__details-icon"]} />
        <div className={classes["currentWeather_details-info"]}>
          <p>Wind</p>
          <p>{weatherConditions.wind}</p>
        </div>
      </div>
      <div className={classes["grid-cel"]}>
        <HiOutlineUser className={classes["currentWeather__details-icon"]} />
        <div className={classes["currentWeather_details-info"]}>
          <p>Feels Like</p>
          <p>{weatherConditions.feels}</p>
        </div>
      </div>
    </div>
  );
  const houerElement = hourWeather.map((hour) => (
    <WeatherItem
      icon={getIcon(hour.weather[0].icon)}
      desc={hour.weather[0].description}
      temp={kelvinToCelcius(hour.temp)}
      hour={getHour(hour.dt)}
    />
  ));

  return (
    <Card className={`${props.className} ${classes.container}`}>
      <div>{currentWeather}</div>
      {details}
      <div className={classes["hourElement-container"]}>{houerElement}</div>
    </Card>
  );
};

export default Weather;
