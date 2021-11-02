import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import intelilogs from '../../assets/intellilogs v2-01.png';

const VisitorAppbar = () => {
  return (
    <>
      <AppBar position="static" height="86px" color="primary">
        <Toolbar>
          <img
            src={intelilogs}
            alt="intelli-logs-logo"
            style={{ width: '227px' }}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default VisitorAppbar;
