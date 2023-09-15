// import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainSearch = () => {
  const query = useSelector(state => state.query.content);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const baseEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=3615b7194462c7fb3a89d6e38feb248f`;

  const handleChange = e => {
    dispatch({ type: "QUERY", payload: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint);
      if (response.ok) {
        const data = await response.json();

        dispatch({ type: "CITY_WEATHER", payload: data });
        navigate(`/weather?lat=${data.coord.lat}&lon=${data.coord.lon}`);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Epiweather</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Type a city name and press Enter"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
