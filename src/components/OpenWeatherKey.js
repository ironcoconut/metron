import React, { useState } from "react";
import { connect } from "react-redux";
import { resources } from "../selectors";

const mapState = (state) => ({
  hasKey: !!resources.openWeatherKey(state),
});

const mapDispatch = {
  set: payload => ({
    type: "set-open-weather-key",
    payload,
    meta: {
      reducer: {
        resource: "openWeatherKey",
        method: "set",
      },
    },
  }),
};

const OpenWeatherKey = ({ set, hasKey }) => {
  const [ key, updateKey ] = useState("");
  return (
    <div className="column">
      <h3>{hasKey ? "Open Weather API Key Set" : "Please set Open Weather API Key."}</h3>
      <label>
        {hasKey ? "Update API Key" : "Set API Key"}
      </label>
      <input
        type="text"
        onChange={e=>updateKey(e.target.value)}
        placeholder="API Key"
        className="u-full-width"
        value={key}
      />
      <div className="container">
        <button
          className="button-primary column"
          onClick={()=>{
            set(key);
            updateKey("");
          }}
          disabled={!key}
        >
          {hasKey ? "Update" : "Set"}
        </button>
        <div className="flex1" />
        <button
          className="button-text column"
          onClick={()=>{
            set("");
            updateKey("");
          }}
          disabled={!hasKey}
        >
          Delete Key
        </button>
      </div>
    </div>
  );
};

export default connect(mapState, mapDispatch)(OpenWeatherKey);
