import React from "react";
import { connect } from "react-redux";
import { getCitiesSearch, currentCity } from "../selectors";

const mapState = (state) => ({
  cities: getCitiesSearch(state),
  city: currentCity(state),
});

const mapDispatch = {
  search: payload => ({
    type: "city-search",
    payload,
    meta: {
      event: "loadCities",
    },
  }),
  onClick: id => ({
    type: "select-city",
    payload: {
      currentCity: id,
      citySearchIds: [],
    },
    meta: {
      reducers: [
        {
          resource: "currentCity",
          method: "set",
          path: ["currentCity"],
        },
        {
          resource: "citySearchIds",
          method: "set",
          path: ["citySearchIds"],
        },
      ],
    }
  }),
};

const cityToString = ({ name, country }) => `${name}, ${country}`;

const CitySearch = ({ city, cities, search, onClick }) => {
  return (
    <div className="column">
      <h3>Current City</h3>
      <p>{city ? cityToString(city) : "Please select a city."}</p>
      { city &&
        <p>{city.id}</p>
      }
      <label>
        Find City
      </label>
      <input
        type="text"
        onChange={e=>search(e.target.value)}
        placeholder="Search for City"
        className="u-full-width"
      />
      {cities.map(city => (
        <button
          key={city.id}
          className="u-full-width button-text"
          onClick={()=>onClick(city.id)}
        >
          {cityToString(city)}
        </button>
      ))}
    </div>
  );
};

export default connect(mapState, mapDispatch)(CitySearch);
