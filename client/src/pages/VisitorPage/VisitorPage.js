import React from 'react';
import { Grid, TextField, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import VisitorAppBar from '../../components/VisitorLogs/VisitorAppbar';
import VisitorData from '../../components/VisitorLogs/VisitorData';

const useStyles = makeStyles({
  toolbar: {
    marginTop: '90px',
  },
});

const VisitorPage = () => {
  const classes = useStyles();

  return (
    <div>
      <VisitorAppBar />
      <Container className={classes.toolbar} maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item md={5}>
            <TextField
              id="searchLog"
              label="Search log"
              variant="outlined"
              size="medium"
              fullWidth
            />
          </Grid>

          <Grid item xs={2} md={2}>
            <Button variant="contained" size="medium" fullWidth>
              New Log
            </Button>
          </Grid>
        </Grid>
        <VisitorData />
      </Container>
    </div>
  );
};

export default VisitorPage;
