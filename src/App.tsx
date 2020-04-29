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
    </div>
  );
}

export default App;
