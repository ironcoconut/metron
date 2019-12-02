import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from "./Nav";
import Users from "./Users";
import Dispatcher from "./Dispatcher";
import CitySearch from "./CitySearch";
import OpenWeatherKey from "./OpenWeatherKey";
import CityWeather from "./CityWeather";

const Root = () => {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/dispatcher">
            <Dispatcher />
          </Route>
          <Route path="/cities">
            <CitySearch />
          </Route>
          <Route path="/open-weather-key">
            <OpenWeatherKey />
          </Route>
          <Route path="/city-weather">
            <CityWeather />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Root;
