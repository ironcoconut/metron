import React, { useState } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { resources, getCitiesSearch } from "../selectors";

const getWeather = createSelector(
  resources.cityWeather,
  cities => Object
  .values(cities)
  .sort((a,b) => {
    const strA = a.sys.country + a.name;
    const strB = b.sys.country + b.name;
    return strA.localeCompare(strB)
  })
);

const mapState = (state) => ({
  weather: getWeather(state),
  cities: getCitiesSearch(state),
});

const mapDispatch = {
  search: payload => ({
    type: "city-search",
    payload,
    meta: {
      event: "loadCities",
    },
  }),
  load: payload => ({
    type: "load-city-weather",
    payload,
    meta: {
      event: "loadCityWeather",
    },
  }),
  reset: () => ({
    type: "reset-city-search",
    payload: [],
    meta: {
      reducer: {
        resource: "citySearchIds",
        method: "set",
      }
    },
  }),
};

const Root = ({ weather, cities, search, load, reset }) => {
  const [ name, updateName ] = useState("");
  return (
    <div className="column">
      <h3>Weather</h3>
      <div className="container">
        <div className="column">
          {weather.map(report => (
            <div key={report.id}>
              <h5>{report.name}, {report.sys.country}</h5>
              <p>{report.main.temp}°F</p>
            </div>
          ))}
        </div>
        <div className="column">
          <label>
            Add City Weather Report
          </label>
          <input
            value={name}
            type="text"
            onChange={e=>{
              updateName(e.target.value);
              search(e.target.value);
            }}
            placeholder="City"
            className="u-full-width"
          />
          {cities.map(city => (
            <button
              key={city.id}
              className="u-full-width button-text"
              onClick={()=>{
                load(city.id);
                reset();
                updateName("");
              }}
            >
              {`${city.name}, ${city.country}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(mapState, mapDispatch)(Root);
