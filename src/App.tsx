import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserDataStore from "./hooks/userData/userDateStore";
import GitHubLink from "./components/gitHubLink/gitHubLink";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <UserDataStore>
              <Route path="/" exact component={HomePage}></Route>
              <Route path="/login" exact component={LoginPage}></Route>
            </UserDataStore>
          </Switch>
        </div>
      </Router>
      <GitHubLink></GitHubLink>
    </div>
  );
}

export default App;
