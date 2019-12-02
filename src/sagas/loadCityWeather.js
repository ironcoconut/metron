import axios from "axios";
import moment from "moment";
import { put, all, call, delay, select, spawn } from "redux-saga/effects";
import { resources } from "../selectors";

let requests = [];
let current;

const units = "imperial";

function* get(id) {
  const APPID = yield select(resources.openWeatherKey);
  const { data: payload } = yield call(axios, {
    method: "get",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: { id, units, APPID }
  });
  yield put({
    type: "load-cities-weather-result",
    payload,
    meta: {
      reducer: {
        resource: "cityWeather",
        method: "set",
      },
    }
  });
}

function* loop() {
  while(0 < requests.length) {
    const next = requests.shift();
    yield all ([
      call(get, next),
      delay(1000),
    ]);
  }
  current = undefined;
}

function* listener(id) {
  const report = yield select(resources.cityWeather, id);

  if(!report || moment(report.dt * 1000).add(10, "minutes").isBefore(moment())) {
    requests.push(id);
    if(!current) {
      current = yield spawn(loop);
    }
  }
}

export default listener;
