import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from "./reducer";
import createPersist from "./reducer/persist";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const persist = createPersist("metron");
const store = createStore(
  reducer("metron"),
  applyMiddleware(
    sagaMiddleware,
    logger,
  ),
);
sagaMiddleware.run(rootSaga)

store.subscribe(() => persist(store.getState()));

export default store;
