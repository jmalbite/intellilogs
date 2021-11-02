import React from 'react';
import { Grid, TextField, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import VisitorAppBar from '../../components/VisitorLogs/VisitorAppbar';

const useStyles = makeStyles({
  container: {
    marginTop: '80px',
  },
});

const VisitorPage = () => {
  const classes = useStyles();

  return (
    <div>
      <VisitorAppBar />
      <Container className={classes.container} maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <TextField
              id="searchLog"
              label="Search log"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid>
            <Button variant="contained">Add</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default VisitorPage;
