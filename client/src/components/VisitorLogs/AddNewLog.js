import React, { useState } from 'react';

import {
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';

const company = ['INTELLICARE', 'AVEGA', 'OTHERS'];

const AddNewLog = () => {
  const companySelected = useState('');

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={10} sm={6} md={4} lg={2}>
        <form>
          <Paper style={{ padding: 20 }} variant="elevation" elevation={3}>
            <Grid container direction="column" spacing={1}>
              <Grid item xs sm alignSelf="center">
                <Typography variant="h5" color="textPrimary">
                  ADD LOG
                </Typography>
              </Grid>

              <Grid item xs sm>
                <TextField
                  className="display-name"
                  variant="outlined"
                  type="text"
                  placeholder="ID Number"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs sm>
                <TextField
                  className="email"
                  variant="outlined"
                  type="email"
                  placeholder="Name"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs sm></Grid>

              <Grid item xs sm>
                <TextField
                  className="confirm-password"
                  variant="outlined"
                  type="password"
                  placeholder="Confirm password"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs sm>
                <Button fullWidth variant="contained" color="primary">
                  Sign Up
                </Button>
              </Grid>

              <Grid item xs sm>
                <Button fullWidth variant="contained" color="secondary">
                  Sign Up with Google
                </Button>
              </Grid>
            </Grid>
            {/* end of inside grid paper  */}
          </Paper>
          {/* end of paper component */}
        </form>
        {/* end of paper component */}
      </Grid>
    </Grid>
  );
};

export default AddNewLog;
