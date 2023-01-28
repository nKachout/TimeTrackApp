import React from 'react';
import { CircularProgress } from '@mui/material';
import { connect } from "react-redux";

function Loading(props) {

  return ( props.loading && (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ));
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps)(Loading);