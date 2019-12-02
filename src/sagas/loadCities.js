import  allCities from "../city.list.json";
import throttle from "./throttle";
import { put } from "redux-saga/effects";

function* search(term) {
  term = term.toLowerCase();
  const cities = allCities
    .filter(({ name }, index) => -1 < name.toLowerCase().indexOf(term))
    .slice(0,10);
  const ids = cities.map(city => city.id);
  yield put({
    type: "load-cities-search-result",
    payload: {
      cities,
      ids,
    },
    meta: {
      reducers: [
        {
          resource: "cities",
          method: "set",
          path: ["cities"],
        },
        {
          resource: "citySearchIds",
          method: "set",
          path: ["ids"],
        },
      ],
    }
  });
}

export default throttle(250, search)
