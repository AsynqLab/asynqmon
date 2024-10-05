import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { saveState } from "./localStorage";
import parseFlagsUnderWindow from "./parseFlags";
import { SettingsState } from "./reducers/settingsReducer";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

parseFlagsUnderWindow();

let currentSettings: SettingsState | undefined = undefined;
store.subscribe(() => {
  const prevSettings = currentSettings;
  currentSettings = store.getState().settings;

  // Write to local-storage only when settings have changed.
  if (prevSettings !== currentSettings) {
    saveState(store.getState());
  }
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// TODO(AsynqLab): Look into this.
serviceWorker.unregister();
