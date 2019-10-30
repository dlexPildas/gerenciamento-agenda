import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login/index";
import Main from "./pages/Main/index";
import Events from "./pages/Events/index";

// import { Container } from './styles';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/events" component={Events} />
      </Switch>
    </BrowserRouter>
  );
}
