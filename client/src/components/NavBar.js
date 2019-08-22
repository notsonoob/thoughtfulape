import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import customButton from "../util/customButton";

// materialize stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              {customButton && (
                <customButton
                  tip="post something.."
                  placement="top"
                  path="../util/customButton"
                >
                  <AddIcon />
                </customButton>
              )}
              {/* <customButton tip="post something..">
                <AddIcon />
              </customButton> */}
              <Link to="/">
                {customButton && (
                  <customButton tip="home" path="../util/customButton">
                    <HomeIcon />
                  </customButton>
                )}
              </Link>
              <customButton tip="notifications">
                <Notifications />
              </customButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/Login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/Signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
