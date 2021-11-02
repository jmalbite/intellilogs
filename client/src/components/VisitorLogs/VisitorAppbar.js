import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import intellilogs from '../../assets/visitorlogsv1.svg';

const VisitorAppbar = () => {
  return (
    <>
      <AppBar height="86px" elevation={0} color="primary">
        <Toolbar>
          <img src={intellilogs} alt="intelli-logs-logo" width="150px" />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default VisitorAppbar;
