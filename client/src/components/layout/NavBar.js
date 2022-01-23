import React, { useState } from 'react';
import { AppBar, Toolbar, useScrollTrigger, Slide, Grid, Tab, Tabs, Box } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';

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
  const routes = ['/', '/borrowerslogs'];
  const [value, setValue] = useState(0);

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
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Tabs value={window.location.pathname !== '/' ? window.location.pathname : false}>
                        <Tab value={routes[0]} label="Visitors" component={Link} to="/" />
                        <Tab value={routes[1]} label="Borrowers" component={Link} to="/borrowerslogs" />
                      </Tabs>
                    }
                  />
                </Routes>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default NavBar;
