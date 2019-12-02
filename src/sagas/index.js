import { spawn, call, takeEvery } from "redux-saga/effects";
import loadCities from "./loadCities";
import loadCityWeather from "./loadCityWeather";

function* boot(payload="No Payload :(") {
  yield call(console.log, "Booting payload:", payload);
}

export const events = { boot, loadCities, loadCityWeather };

function* eventWatcher(action) {
  const event = events[action.meta.event];

  if(event) {
    yield spawn(event, action.payload);
  }
}

export default function* () {
  yield takeEvery(
    action => action.meta && action.meta.event && events[action.meta.event],
    eventWatcher
  );
}
