import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import Planer from "./components/Planer/Planer";
import store from "./store/index";




if (!localStorage.userCity) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Planer />
    </Provider>,

    document.getElementById("root")
  );
}
