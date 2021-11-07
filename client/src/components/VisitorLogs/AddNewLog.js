import React, { useState } from 'react';

import {
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';

const company = ['INTELLICARE', 'AVEGA', 'AVENTUS', 'OTHERS'];
const areas = ['IT WORKSTATIONS', 'STOCK ROOM', 'SERVER ROOM'];

const AddNewLog = () => {
  const [companySelected, setCompanySelected] = useState('');
  const [areaToVisit, setAreaToVisit] = useState('');

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={10} sm={6} md={4} lg={3}>
        <form>
          <Paper style={{ padding: 20 }} variant="elevation" elevation={3}>
            <Grid container direction="column" spacing={1}>
              <Grid item xs sm alignSelf="center">
                <Typography variant="h5" color="textPrimary">
                  ADD LOG
                </Typography>
              </Grid>

              {/* ID NUMBER */}
              <Grid item xs sm>
                <TextField
                  label="ID number"
                  className="id-number"
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>

              {/* NAME */}
              <Grid item xs sm>
                <TextField
                  className="name"
                  variant="outlined"
                  type="text"
                  label="Name"
                  fullWidth
                  required
                />
              </Grid>

              {/* COMPANY */}
              <Grid item xs sm>
                <FormControl fullWidth>
                  <InputLabel id="company">Company</InputLabel>
                  <Select
                    labelId="company"
                    id="com"
                    value={companySelected}
                    onChange={(event) => setCompanySelected(event.target.value)}
                    label="Company"
                    required
                  >
                    {company.map((com) => (
                      <MenuItem key={com} value={com}>
                        {com}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* OTHERS IF COMPANY IS SELECTE AS 'OTHERS' */}
              {companySelected === 'OTHERS' ? (
                <Grid item xs sm>
                  <TextField
                    className="name"
                    variant="outlined"
                    type="text"
                    fullWidth
                    required
                    label="Please input company"
                  />
                </Grid>
              ) : null}

              {/* AREA TO VISIT */}
              <Grid item xs sm>
                <FormControl fullWidth>
                  <InputLabel id="area-to-visit">Area</InputLabel>
                  <Select
                    labelId="area"
                    id="area-to-visit"
                    value={areaToVisit}
                    onChange={(event) => setAreaToVisit(event.target.value)}
                    required
                    label="Area"
                  >
                    {areas.map((area) => (
                      <MenuItem key={area} value={area}>
                        {area}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* PURPOSE */}
              <Grid item xs sm>
                <TextField
                  className="name"
                  variant="outlined"
                  type="text"
                  label="Purpose"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs sm>
                <Button fullWidth variant="contained" color="secondary">
                  Save Log
                </Button>
              </Grid>

              <Grid item xs sm>
                <Button fullWidth variant="contained" color="primary">
                  Clear
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
