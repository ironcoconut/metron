import store from "./store";
import {
  resources,
  methods,
} from "./reducer";
import {
  events,
} from "./sagas";
import * as selectors from "./selectors";

window.metron = {
  store,
  resources,
  methods,
  events,
  selectors,
};
