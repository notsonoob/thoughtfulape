import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../util/CustomButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// material ui
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// material icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// redux
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});

class ScreamDialog extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  // render
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinThatWheel} >
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="profile-img"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            t0={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );

    // return
    return (
      <>
        <CustomButton
          onClick={this.handleOpen}
          tip="expand </>"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.close}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </CustomButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
