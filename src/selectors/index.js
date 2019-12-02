import get from "lodash/get";
import { createSelector } from "reselect";
import { resources as config } from "../reducer";

export const resources = Object
  .values(config)
  .reduce((acc,{ name, path }) => {
    acc[name] = (state, id) => {
      return id
        ? get(state, path)[id]
        : get(state, path);
    };
    return acc;
  }, {});

export const currentUser = createSelector(
  resources.users,
  resources.currentUser,
  (users, uuid) => users[uuid]
);

export const currentCity = createSelector(
  resources.cities,
  resources.currentCity,
  (cities, id) => cities[id]
);

export const getCitiesSearch = createSelector(
  resources.cities,
  resources.citySearchIds,
  (cities, ids) => ids.map(id => cities[id])
);
