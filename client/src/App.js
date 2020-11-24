import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// components
import Navbar from "./components/layout/NavBar";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

// utils
import themeFile from "./util/theme";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeFile);

/**
 * for user token we will presist in the browser
 * so that we can secure the progress of the user even though the
 * page is refeshed
 * doing authState work
 */

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // if the token is expired
  if (decodedToken.exp * 1000 <= Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

// intiializing the root structure of our app
class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:handle" component={user} />
                </Switch>
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
