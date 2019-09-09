import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import customButton from "../util/customButton";

// mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// icon
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    error: {}
  };

  // Component api handling
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });

      // optional
      // if (!nextProps.UI.errors && !nextProps.UI.loading) {
      //   this.setState({ body: "" });
      //   this.handleClose();
      // }
    }
  }

  // handlers
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

  // redenering the redux
  render() {
    const errors = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <>
        <customButton onClick={this.handleOpen} tip="post something">
          <AddIcon color="blue" />
        </customButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.close}
          fullWidth
          maxWidth="sm"
        >
          <customButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </customButton>
          <DialogTitle>Tell the World!</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="thoughtToday: "
                multiline
                row="3"
                placeholder="@thoughtfulape: show us - THE - you!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

// connecitng all the function with redux and hooks with styles
export default connect(
  mapStateToProps,
  { postScream }
)(withStyles(styles)(PostScream));
