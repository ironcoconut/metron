import React, { useState } from "react";
import { connect } from "react-redux";

const Dispatcher = ({ dispatch }) => {
  const [ type, updateType ] = useState("");
  const [ payload, updatePayload ] = useState("");
  const [ event, updateEvent ] = useState("");
  const [ reducer, updateReducer ] = useState("");
  return (
    <div className="column">
      <h3>Dispatch Action</h3>
      <label>
        Type
      </label>
      <input
        value={type}
        type="text"
        onChange={e=>updateType(e.target.value)}
        placeholder="Type"
        className="u-full-width"
      />
      <label>
        Payload
      </label>
      <input
        value={payload}
        type="text"
        onChange={e=>updatePayload(e.target.value)}
        placeholder="Payload"
        className="u-full-width"
      />
      <h4>Meta</h4>
      <label>
        Event
      </label>
      <input
        value={event}
        type="text"
        onChange={e=>updateEvent(e.target.value)}
        placeholder="Event"
        className="u-full-width"
      />
      <label>
        Reducer
      </label>
      <input
        value={reducer}
        type="text"
        onChange={e=>updateReducer(e.target.value)}
        placeholder="Reducer"
        className="u-full-width"
      />
      <div className="container">
        <button
          onClick={()=>{
            updateType("");
            updatePayload("");
            updateEvent("");
            updateReducer("");
          }}
          disabled={!type && !payload && !event && !reducer}
        >
          Clear
        </button>
        <div className="flex1" />
        <button
          className="button-primary"
          onClick={()=>dispatch({ type, payload, meta: { reducer, event }})}
          disabled={!type}
        >
          Dispatch
        </button>
      </div>
    </div>
  );
};

export default connect()(Dispatcher);
