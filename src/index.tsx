import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { applyPolyfills, defineCustomElements } from "@ionic/core/loader";
var firebaseConfig = {
  apiKey: process.env.REACT_APP_google_api_client,
  authDomain: "wish-list-196f2.firebaseapp.com",
  databaseURL: "https://wish-list-196f2.firebaseio.com",
  projectId: "wish-list-196f2",
  storageBucket: "wish-list-196f2.appspot.com",
  appID: "wish-list-196f2",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

applyPolyfills().then(() => {
  defineCustomElements();
});
