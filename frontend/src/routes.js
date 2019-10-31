import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login/index";
import Main from "./pages/Main/index";
import Events from "./pages/Events/index";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/main" component={Main} />
        {/* <Route path="/main" component={Main} /> */}
        <PrivateRoute path="/events" component={Events} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
