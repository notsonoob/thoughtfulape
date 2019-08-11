import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// components
import Navbar from "./components/NavBar";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

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
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // if the token is expired
  if (decodedToken.exp * 1000 <= Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

// intiializing the root structure of our app
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
