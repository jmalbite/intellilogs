import React, { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.js';
import { useSelector } from 'react-redux';

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

const companies = ['INTELLICARE', 'AVEGA', 'AVENTUS', 'OTHERS'];
const areas = ['IT WORKSTATIONS', 'STOCK ROOM', 'SERVER ROOM'];

//Add new log component
const AddNewLog = () => {
  const [postVisitorlog, setPostVisitorlog] = useState({
    id_number: '',
    name: '',
    company: '',
    area_visited: '',
    purpose: '',
    signature: '',
    time_visited: new Date(),
  });
  const userSign = useSelector((state) => state.user_signature);
  const [companySelected, setCompanySelected] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorPurpose, setErrorPurpose] = useState(false);
  const [errorArea, setErrorArea] = useState(false);
  const [errorSign, setErrorSign] = useState(false);

  useEffect(() => {
    console.log('rendered');
    setPostVisitorlog({ ...postVisitorlog, signature: userSign });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  const handleChangeCompany = (e) => {
    //setCompanySelected(e.target.value);
    setPostVisitorlog({ ...postVisitorlog, company: e.target.value });
    setCompanySelected(e.target.value);
  };

  const handleArea = (e) => {
    setPostVisitorlog({ ...postVisitorlog, area_visited: e.target.value });
  };

  const save = (e) => {
    e.preventDefault();
    setErrorName(false);
    setErrorCompany(false);
    setErrorArea(false);
    setErrorPurpose(false);
    setErrorSign(false);
    //form validations
    //check empty
    if (postVisitorlog.name.trim() === '') setErrorName(true);
    if (postVisitorlog.company.trim() === '') setErrorCompany(true);
    if (postVisitorlog.area_visited.trim() === '') setErrorArea(true);
    if (postVisitorlog.purpose.trim() === '') setErrorPurpose(true);
    if (postVisitorlog.signature.trim() === '') setErrorSign(true);
  };

  return (
    <Grid item xs>
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
                onChange={(e) =>
                  setPostVisitorlog({
                    ...postVisitorlog,
                    id_number: e.target.value,
                  })
                }
              />
            </Grid>

            {/* NAME */}
            <Grid item xs sm>
              <TextField
                className="name"
                variant="outlined"
                type="text"
                label="Name"
                error={errorName}
                fullWidth
                required
                onChange={(e) =>
                  setPostVisitorlog({
                    ...postVisitorlog,
                    name: e.target.value,
                  })
                }
              />
            </Grid>

            {/* COMPANY */}
            <Grid item xs sm>
              <FormControl fullWidth>
                <InputLabel error={errorCompany} id="company">
                  Company
                </InputLabel>
                <Select
                  error={errorCompany}
                  labelId="company"
                  id="com"
                  value={companySelected}
                  label="Company"
                  onChange={handleChangeCompany}
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* OTHERS IF COMPANY IS SELECTED AS 'OTHERS' */}
            {companySelected === 'OTHERS' ? (
              <Grid item xs sm>
                <TextField
                  className="name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  error={errorCompany}
                  label="Please input company"
                  onChange={(e) =>
                    setPostVisitorlog({
                      ...postVisitorlog,
                      company: e.target.value,
                    })
                  }
                />
              </Grid>
            ) : null}

            {/* AREA TO VISIT */}
            <Grid item xs sm>
              <FormControl fullWidth>
                <InputLabel error={errorArea} id="area-to-visit">
                  Area
                </InputLabel>
                <Select
                  error={errorArea}
                  labelId="area"
                  id="area-to-visit"
                  value={postVisitorlog.area_visited}
                  onChange={handleArea}
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
                error={errorPurpose}
                onChange={(e) =>
                  setPostVisitorlog({
                    ...postVisitorlog,
                    purpose: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs sm>
              <SignaturePad signer={errorSign} />
            </Grid>

            <Grid item xs sm>
              <Button
                onClick={save}
                fullWidth
                variant="contained"
                color="secondary"
              >
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
  );
};

export default AddNewLog;
