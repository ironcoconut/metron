import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currentUser } from "../selectors";

const mapState = (state) => ({
  user: currentUser(state),
});

const Nav = ({ user}) => {
  return (
    <div className="nav">
      <p>Hello, {user ? user.handle : "Guest"}!</p>
      <ul>
        <li>
          <Link to="/cities">Cities</Link>
        </li>
        <li>
          <Link to="/dispatcher">Dispatcher</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/open-weather-key">OW Key</Link>
        </li>
        <li>
          <Link to="/city-weather">Weather</Link>
        </li>
      </ul>
    </div>
  );
};

export default connect(mapState)(Nav);
