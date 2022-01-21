import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Grid,
  TabList,
  Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';

import intellilogs from '../../assets/visitorlogsv1.svg';
import { useEffect } from 'react';

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

const NavBar = () => {
  const [value, setValue] = useState();

  return (
    <>
      <HideOnScroll>
        <AppBar height="86px" elevation={0} color="primary">
          <Toolbar>
            {/* <img src={intellilogs} alt="intelli-logs-logo" width="150px" /> */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <img src={intellilogs} alt="intelli-logs-logo" width="150px" />
              </Grid>

              <Grid item>
                {/* <nav>
                  <Link to="/">Visitors</Link>
                  <Link to="/borrowerslogs">Borrowers</Link>
                </nav> */}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default NavBar;
