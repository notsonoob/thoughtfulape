import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customButton from "../util/customButton";
import PropTypes from "prop-types";

// mui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// icon
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// redux
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

const styles = {
  deleteButtonup: {
    position: "float",
    top: "10%",
    left: "90%"
  }
};

class DeleteScream extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        {customButton && <customButton
          tip="delete"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" className='deleteButtonup'/>
        </customButton>}
        {/* <customButton
          tip="delete"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </customButton> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <div className="deleteSection">
              <p>Are you sure, you want to delete ?</p>
              <small>you can't undo this action</small>
            </div>
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="Secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(DeleteScream));
