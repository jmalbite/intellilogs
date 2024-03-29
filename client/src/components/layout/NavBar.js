import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, useScrollTrigger, Slide, Grid, Tab, Tabs } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
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

const NavBar = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  // let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //checking user what route
  useEffect(() => {
    if (location.pathname === '/') {
      setValue(0);
    }
    if (location.pathname === '/borrowerslogs') {
      setValue(1);
    }
    console.log(location);
  }, [location]);

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

              <Grid item lg={4}>
                <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={handleChange}>
                  <Tab disableRipple={true} label="Visitors" value={0} component={NavLink} to="/" />
                  <Tab disableRipple={true} label="Borrowers" value={1} component={NavLink} to="/borrowerslogs" />
                </Tabs>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default NavBar;
