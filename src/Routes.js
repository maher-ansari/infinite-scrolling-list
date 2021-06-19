import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import Login from "./Pages/Login/Login";
import ContactList from "./Pages/ContactList/ContactList";
import NotFound from "./Pages/NotFound/NotFound";

const authGuard = (Component) => () => {
  return localStorage.getItem("token") ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
};
const Routes = (props) => (
  
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/contact" render={authGuard(ContactList)}></Route>
      <Route exact path="/">
        <Redirect to="/contact" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default Routes;