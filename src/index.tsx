import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store, { persistor } from "src/ducks";
import { PersistGate } from "redux-persist/integration/react";
import AppRoute from "src/routes";
import { GlobalStyle } from "./styles/global.style";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <AppRoute />
      </PersistGate>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
