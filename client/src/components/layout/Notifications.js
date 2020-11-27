/**
 * notifications functionality for user specific logins
 * and various interactions throughout the website
 */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// MUI icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class Notifications extends Component {
  state = {
    anchorE1: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorE1: event.target });
  };

  handleClose = () => {
    this.setState({ anchorE1: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificatonsId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorE1 = this.state.anchorE1;

    dayjs.extend(relativeTime);

    // we need to show a badge of number of notifications otherwise we will show
    // just a notification icon

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    // making up linguistic notifications
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} your post {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          you have no notifications yet
        </MenuItem>
      );

    return (
      <>
        <ToolTip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorE1 ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </ToolTip>
        <Menu
          anchorE1={anchorE1}
          open={Boolean(anchorE1)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  withStyles(styles)(Notifications)
);
