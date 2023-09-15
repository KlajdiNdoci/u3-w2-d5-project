import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WeatherForecast from "./WeatherForecast";

const Weather = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");
  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weatherData.content);
  const isLoading = useSelector(state => state.isLoading.content);
  const error = useSelector(state => state.error.content);
  console.log(weatherData);

  const iconCode = weatherData?.list[0].weather[0]?.icon;
  const iconFileName = iconCode ? `${iconCode}.png` : null;
  const iconPath = iconFileName ? require(`./assets/${iconFileName}`) : null;

  const celsiusTemperature = (weatherData?.list[0].main.temp - 273.15).toFixed(0);

  const firstForecast = weatherData?.list[0];

  const dateTime = firstForecast ? new Date(firstForecast.dt_txt) : null;

  const time = dateTime ? dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : null;

  const date = weatherData?.list[0] ? new Date(weatherData.list[0].dt_txt) : null;

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayIndex = date ? date.getDay() : null;

  const dayName = dayIndex !== null ? weekDays[dayIndex] : null;

  const baseEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=35523fb0d79c396b6f9b7ee412299bed`;

  useEffect(() => {
    if (!isLoading) {
      dispatch({ type: "LOADING_WEATHER" });
      getWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const getWeather = async () => {
    try {
      const response = await fetch(baseEndpoint);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "WEATHER_DATA", payload: data });
      } else {
        const errorMessage = "Error fetching results";
        dispatch({ type: "WEATHER_ERROR", payload: errorMessage });
      }
    } catch (error) {
      console.log(error);
      const errorMessage = "An error occurred";
      dispatch({ type: "WEATHER_ERROR", payload: errorMessage });
    }
  };

  const weatherDataByDay = weatherData
    ? weatherData.list.reduce((acc, forecast) => {
        const dateTime = new Date(forecast.dt_txt);
        const dayIndex = dateTime.getDay();
        const dayName = weekDays[dayIndex];

        if (!acc[dayName]) {
          acc[dayName] = [];
        }

        acc[dayName].push(forecast);

        return acc;
      }, {})
    : {};

  function isToday(day) {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
    return day === weekday;
  }

  return (
    <>
      {weatherData ? (
        <Container>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <Row className="p-3 text-start">
                <h2>
                  {weatherData.city.name} , {weatherData.city.country}
                </h2>
                <p>
                  {dayName} {time}, {weatherData.list[0].weather[0].main}
                </p>
              </Row>
              <Row className="rounded-5 mb-5 p-4" style={{ backgroundColor: "#F0F5FA" }}>
                <div>
                  <Row className="align-items-center mb-5">
                    <Col xs={3} lg={3}>
                      {iconPath ? (
                        <img
                          src={iconPath}
                          alt={weatherData.list[0].weather[0].description}
                          style={{ width: "100px" }}
                        />
                      ) : (
                        <div>image not found</div>
                      )}
                    </Col>
                    <Col xs={3} lg={3} className="me-auto display-3 fw-medium">
                      {celsiusTemperature}°C
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="text-start">
                        <Row>
                          <Col xs={6} md={4}>
                            Rain
                          </Col>
                          <Col xs={6} className="text-secondary">
                            {weatherData.list[0].clouds.all}%
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={4}>
                            Humidity
                          </Col>
                          <Col xs={6} className="text-secondary">
                            {weatherData.list[0].main.humidity}%
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={4}>
                            Wind
                          </Col>
                          <Col xs={6} className="text-secondary">
                            {weatherData.list[0].wind.speed} mp/h
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row style={{ backgroundColor: "#F6F9FC" }} className="flex-nowrap overflow-hidden p-3 rounded-5">
                        {weatherData.list.slice(0, 6).map((forecast, index) => (
                          <Col key={index} xs={4} md={3} lg={2}>
                            <WeatherForecast forecast={forecast} />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Row>

              <Row className="rounded-5 mb-2 p-4" style={{ backgroundColor: "#F0F5FA" }}>
                <Col xs={12}>
                  <Col>
                    <Row style={{ backgroundColor: "#F6F9FC" }} className="flex-nowrap overflow-hidden p-3 rounded-5">
                      {Object.keys(weatherDataByDay).map((day, index) => {
                        if (!isToday(day)) {
                          return (
                            <Col key={index}>
                              <h4>{day}</h4>
                              {weatherDataByDay[day]
                                .filter(forecast => {
                                  const forecastTime = new Date(forecast.dt_txt).getHours();
                                  return forecastTime === 12;
                                })
                                .map((forecast, index) => (
                                  <WeatherForecast key={index} forecast={forecast} />
                                ))}
                            </Col>
                          );
                        }
                        return null;
                      })}
                    </Row>
                  </Col>
                </Col>
              </Row>
            </>
          )}
        </Container>
      ) : null}
    </>
  );
};

export default Weather;
