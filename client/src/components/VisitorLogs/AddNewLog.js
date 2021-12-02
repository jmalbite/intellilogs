import React, { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.js';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { clear_signature, storeNewLog } from '../../actions/visitor_action';

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

const schema = yup.object().shape({
  employee_code: yup.string(),
  visitorname: yup.string().required(),
  area_visited: yup.string().required(),
  purpose: yup.string().required(),
});

//Add new log component
const AddNewLog = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const userSign = useSelector((state) => state.user_signature);
  const dispatch = useDispatch();

  const [companySelected, setCompanySelected] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorPurpose, setErrorPurpose] = useState(false);
  const [errorArea, setErrorArea] = useState(false);
  const [isSign, setIsSigned] = useState(false);

  //inserting visitor signature in postVisitorLog state
  useEffect(() => {
    //checking if signature pad was filled checking in redux reducer
    if (userSign === '') setIsSigned(true);
    else setIsSigned(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  //this useUffect checking the empty fields
  // useEffect(() => {
  //   if (errors.visitorname) setErrorName(true);
  //   else setErrorName(false);

  //   if (errors.company) setErrorCompany(true);
  //   else setErrorCompany(false);

  //   if (errors.area_to_visit) setErrorArea(true);
  //   else setErrorArea(false);

  //   if (errors.purpose) setErrorPurpose(true);
  //   else setErrorPurpose(false);
  // }, [
  //   errors.visitorname,
  //   errors.company,
  //   errors.area_to_visit,
  //   errors.purpose,
  // ]);

  // //checking the company select component
  const handleChangeCompany = (e) => {
    setCompanySelected(e.target.value);
  };

  const handleClear = () => {
    setCompanySelected('');
    reset();
    dispatch(clear_signature());
  };

  // const handleChangeOthers = (e) => {
  //   setPostVisitorlog({ ...postVisitorlog, company: e.target.value });
  // };

  // //handle are component
  // const handleArea = (e) => {
  //   setPostVisitorlog({ ...postVisitorlog, area_visited: e.target.value });
  // };

  const save = (data) => {
    let newData = data;
    const signature = userSign;
    const company = companySelected;
    //if (!isSign) {
    newData = { ...newData, signature, company };
    console.log(newData);
    //dispatch(storeNewLog(newData));
    //} else console.log('signature not yet filled');
  };

  return (
    <Grid item xs>
      <Grid container direction="column" spacing={1}>
        <Grid item xs sm alignSelf="center">
          <Typography variant="h5" color="textPrimary">
            ADD Log
          </Typography>
        </Grid>

        {/* USER MUST SELECT COMPANY FIRST */}
        <Grid item xs sm>
          <FormControl required fullWidth>
            <InputLabel id="company-select">Company</InputLabel>
            <Select
              value={companySelected}
              labelId="company"
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
        <Grid item xs sm>
          {companySelected !== 'OTHERS' ? (
            <form autoComplete="off" noValidate onSubmit={handleSubmit(save)}>
              <Grid container direction="column" spacing={1}>
                {/* ID NUMBER */}
                <Grid item xs sm>
                  <Controller
                    name="employee_code"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        type="text"
                        label="ID number"
                        error={!!errors.employee_code}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                {/* VISITOR NAME */}
                <Grid item xs sm>
                  <Controller
                    name="visitorname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        variant="outlined"
                        type="text"
                        label="Name"
                        error={!!errors.visitorname}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                {/* AREA TO VISIT */}
                <Grid item xs sm>
                  <FormControl fullWidth required error={!!errors.area_visited}>
                    <InputLabel id="company-select">Area</InputLabel>
                    <Controller
                      name="area_visited"
                      control={control}
                      defaultValue=""
                      render={(field) => (
                        <Select label="Area">
                          {areas.map((area) => (
                            <MenuItem key={area} value={area}>
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

                {/* PURPOSE */}
                <Grid item xs sm>
                  <Controller
                    name="purpose"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        required
                        type="text"
                        label="Purpose"
                        error={!!errors.purpose}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                {/* BUTTONS */}

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
                  <Button
                    onClick={handleClear}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddNewLog;
