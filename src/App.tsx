import React from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./App.router";
import NavBar from "./components/navBar/navBar";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar></NavBar>
          <AppRouter></AppRouter>
        </div>
      </Router>
      <div className="github">
        <a href="https://github.com/oxigenao/react-wish-list">
          <img
            width="30px"
            height="30px"
            alt="logo-github"
            src="https://cdn.worldvectorlogo.com/logos/github-icon.svg"
          ></img>
        </a>
      </div>
    </div>
  );
}

export default App;
