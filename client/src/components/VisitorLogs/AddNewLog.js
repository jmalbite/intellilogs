import React, { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.js';
import { useSelector } from 'react-redux';

import {
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
  const [isSign, setIsSigned] = useState(false);

  useEffect(() => {
    console.log('rendered1');
    setPostVisitorlog({ ...postVisitorlog, signature: userSign });
    if (userSign === '') setIsSigned(true);
    else setIsSigned(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  const handleChangeCompany = (e) => {
    if (e.target.value !== 'OTHERS') {
      setPostVisitorlog({ ...postVisitorlog, company: e.target.value });
      setCompanySelected(e.target.value);
    } else {
      setPostVisitorlog({ ...postVisitorlog, company: '' });
      setCompanySelected(e.target.value);
    }
  };

  const handleArea = (e) => {
    setPostVisitorlog({ ...postVisitorlog, area_visited: e.target.value });
  };

  const checkEmpty = () => {
    console.log('name:', errorName);
    console.log('company:', errorCompany);
    console.log('purpose:', errorPurpose);
    console.log('area:', errorArea);
    console.log('sign:', isSign);
    console.log('name', postVisitorlog.name);
    if (!errorName && !errorCompany && !errorPurpose && !errorArea && !isSign)
      return false;
    else return true;
  };

  const save = (e) => {
    e.preventDefault();
    setErrorName(false);
    setErrorCompany(false);
    setErrorArea(false);
    setErrorPurpose(false);

    //form validations
    //check empty
    if (postVisitorlog.name === '') setErrorName(true);
    if (postVisitorlog.company === '') setErrorCompany(true);
    if (postVisitorlog.area_visited === '') setErrorArea(true);
    if (postVisitorlog.purpose === '') setErrorPurpose(true);

    console.log(checkEmpty());
    if (checkEmpty() === true) {
      console.log('some fields are empty');
    } else console.log('data saved');

    // console.log('name:', errorName);
    // console.log('company:', errorCompany);
    // console.log('purpose:', errorPurpose);
    // console.log('area:', errorArea);
    console.log(postVisitorlog);
  };

  return (
    <Grid item xs>
      <form onSubmit={save} noValidate>
        <div>
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
                onChange={(e) => ({ ...postVisitorlog, name: e.target.value })}
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
              <FormControl required fullWidth>
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
                  required
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
                  required
                  className="name"
                  variant="outlined"
                  type="text"
                  fullWidth
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
                  required
                  error={errorArea}
                  labelId="area"
                  id="area-to-visit"
                  value={postVisitorlog.area_visited}
                  onChange={handleArea}
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
                required
                className="name"
                variant="outlined"
                type="text"
                label="Purpose"
                fullWidth
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
              <SignaturePad />
            </Grid>

            <Grid item xs sm>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
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
        </div>
        {/* end of paper component */}
      </form>
      {/* end of paper component */}
    </Grid>
  );
};

export default AddNewLog;
