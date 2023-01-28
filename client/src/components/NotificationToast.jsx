import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, connect } from "react-redux";
import { clear } from "../stateManage/slices/authSlice";

function NotificationToast(props) {
  const { severity, message } = props;
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clear());
  };
  return (
    message !== "" && (
      <Snackbar
        open={message !== ""}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    severity: state.auth.severity,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps)(NotificationToast);
