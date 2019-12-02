import React from 'react';
import store from "./store";
import { Provider } from 'react-redux'
import Root from "./components/Root";

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
