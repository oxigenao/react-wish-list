import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import GitHubLink from "./components/gitHubLink/gitHubLink";
import { UserDataStore } from "./hooks/userData/userDataStore";
import SharePage from "./pages/SharePage/SharePage";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <UserDataStore>
              <Route path="/" exact component={HomePage}></Route>
              <Route path="/login" exact component={LoginPage}></Route>
              <Route path="/share/:id" exact component={SharePage}></Route>
            </UserDataStore>
          </Switch>
        </div>
      </Router>
      <GitHubLink></GitHubLink>
    </div>
  );
}

export default App;
