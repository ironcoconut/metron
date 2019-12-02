import React, { useState } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import uuidv4 from  'uuid/v4';
import { resources, currentUser } from "../selectors";

const getUsers = createSelector(
  resources.users,
  users => Object
  .values(users)
  .sort((a,b) => a.handle.localeCompare(b.handle))
);

const mapState = (state) => ({
  users: getUsers(state),
  currentUser: currentUser(state),
});

const mapDispatch = {
  createUser: handle => ({
    type: "create-user",
    payload: {
      uuid: uuidv4(),
      handle,
    },
    meta: {
      reducers: [
        {
          resource: "users",
          method: "set",
        },
        {
          resource: "currentUser",
          method: "set",
          path: [ "uuid" ],
        },
      ],
    },
  }),
  selectUser: uuid => ({
    type: "select-user",
    payload: uuid,
    meta: {
      reducer: {
        resource: "currentUser",
        method: "set",
      },
    },
  }),
  removeUser: uuid => ({
    type: "remove-user",
    payload: uuid,
    meta: {
      reducer: {
        resource: "users",
        method: "remove",
      }
    }
  }),
};

const Root = ({ users, currentUser, createUser, selectUser, removeUser }) => {
  const [ handle, updateHandle ] = useState("");
  return (
      <div className="column">
        <h3>Current User</h3>
        <h5>{currentUser ? currentUser.handle : "None selected"}</h5>
        <button
          className="button-primary"
          onClick={()=>selectUser("")}
          disabled={!currentUser}
        >
          Clear current user
        </button>
        <hr />
        <h3>All Users</h3>
        {users.map(user => (
          <div key={user.uuid}className="container">
            <button
              onClick={()=>removeUser(user.uuid)}
            >
              X
            </button>
            <button
              onClick={()=>selectUser(user.uuid)}
              disabled={currentUser && user.uuid === currentUser.uuid}
              className="column"
            >
              Select
            </button>
            <p className="flex1">
              {user.handle}
            </p>
          </div>
        ))}
        <label>
          Add New User
        </label>
        <input
          value={handle}
          type="text"
          onChange={e=>updateHandle(e.target.value)}
          placeholder="Handle"
          className="u-full-width"
        />
        <button
          onClick={()=>{
            createUser(handle);
            updateHandle("");
          }}
          disabled={!handle}
        >
          Create!
        </button>
      </div>
  );
};

export default connect(mapState, mapDispatch)(Root);
