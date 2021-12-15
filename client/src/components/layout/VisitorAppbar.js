import React from 'react';
import { AppBar, Toolbar, useScrollTrigger, Slide } from '@mui/material';
import { Link } from 'react-router-dom';

import intellilogs from '../../assets/visitorlogsv1.svg';

//this function is for hiding the appbar
function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? null : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const VisitorAppbar = () => {
  return (
    <>
      <HideOnScroll>
        <AppBar height="86px" elevation={0} color="primary">
          <Toolbar>
            <img src={intellilogs} alt="intelli-logs-logo" width="150px" />

            <nav>
              <Link to="/">Visitors</Link>
              <Link to="/borrowerslogs">Borrowers</Link>
            </nav>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default VisitorAppbar;
