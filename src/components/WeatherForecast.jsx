const WeatherForecast = ({ forecast }) => {
  const iconCode = forecast.weather[0].icon;
  const iconFileName = `${iconCode}.png`;
  const iconPath = require(`./assets/${iconFileName}`);
  const celsiusTemperature = (forecast.main.temp - 273.15).toFixed(0);
  const dateTime = forecast ? new Date(forecast.dt_txt) : null;
  const time = dateTime ? dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : null;

  return (
    <div className="forecast-item">
      <p className="text-secondary">{time}</p>
      <img className="mb-3" src={iconPath} alt={forecast.weather[0].description} style={{ width: "50px" }} />
      <p className="fw-medium">{celsiusTemperature}°C</p>
      <p className="fw-medium m-0">
        <img
          src="https://cdn2.iconfinder.com/data/icons/weather-blue-filled-line/32/Weather_drops_rain_water_drop_rainy_wet-256.png"
          style={{ width: "30px" }}
          alt="water"
        />{" "}
        {forecast.clouds.all}%
      </p>
    </div>
  );
};

export default WeatherForecast;
