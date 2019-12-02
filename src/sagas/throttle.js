import { spawn, call, delay } from "redux-saga/effects";

function createDebounce(duration, fn) {
  let current, next;

  function* debounce() {
    while(next) {
      const n = next;
      next = undefined;
      yield call(fn, ...n);
      yield delay(duration);
    };
    current = undefined;
  }

  function* listener(...args) {
    next = args
    if(!current) {
      current = yield spawn(debounce);
    }
  }

  return listener;
}

export default createDebounce;
