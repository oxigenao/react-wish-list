import { Switch, Route } from "react-router";
import React from "react";
import HomePage from "./pages/HomePage/HomePage";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage}></Route>
    </Switch>
  );
}

export default AppRouter;
