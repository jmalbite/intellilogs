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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

const companies = ['INTELLICARE', 'AVEGA'];
const areas = ['IT WORKSTATIONS', 'STOCK ROOM', 'SERVER ROOM'];

const schema = yup.object().shape({
  employee_code: yup.string(),
  company: yup.string().required(),
  visitorname: yup.string().required(),
  area_visited: yup.string().required(),
  purpose: yup.string().required(),
  otherCompany: yup.string().required(),
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
  const [isShow, setIShow] = useState(false);
  const [isSign, setIsSigned] = useState(false);
  const [otherCom, setOtherCom] = useState(false);

  //inserting visitor signature in postVisitorLog state
  useEffect(() => {
    //checking if signature pad was filled - checking in redux reducer
    if (userSign === '') setIsSigned(true);
    else setIsSigned(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  useEffect(() => {
<<<<<<< HEAD
    if (errors.visitorname) setErrorName(true);
    else setErrorName(false);

    if (errors.company) setErrorCompany(true);
    else setErrorCompany(false);

    if (errors.otherCompany) setOtherCom(true);
    else setOtherCom(false);

    if (errors.area_to_visit) setErrorArea(true);
    else setErrorArea(false);

    if (errors.purpose) setErrorPurpose(true);
    else setErrorPurpose(false);
  }, [
    errors.visitorname,
    errors.company,
    errors.area_to_visit,
    errors.purpose,
    errors.otherCompany,
  ]);
=======
    if (!!companySelected) setIShow(true);
    else setIShow(false);
  }, [companySelected]);
>>>>>>> eb03435a403428c763d59c671982d26ece91e0f6

  const handleClear = () => {
    reset({
      company: '',
      area_visited: '',
      visitorname: '',
      employee_code: '',
      purpose: '',
    });
    dispatch(clear_signature());
  };

<<<<<<< HEAD
  //handle area component
  const handleArea = (e) => {
    setPostVisitorlog({ ...postVisitorlog, area_visited: e.target.value });
  };

  const save = () => {
=======
  const save = (data) => {
    let visitorsData = data;
    const signature = userSign;
    const time_visited = new Date();
>>>>>>> eb03435a403428c763d59c671982d26ece91e0f6
    if (!isSign) {
      visitorsData = { ...visitorsData, signature, time_visited };
      console.log(visitorsData);
      dispatch(storeNewLog(visitorsData));
      handleClear();
    } else console.log('signature not yet filled');
  };

  return (
    <Grid item xs>
      <Grid container direction="column" spacing={1}>
        <Grid item xs sm alignSelf="center">
          <Typography variant="h5" color="textPrimary">
            ADD Log
          </Typography>
        </Grid>

<<<<<<< HEAD
            {/* ID NUMBER */}
            <Grid item xs sm>
              <TextField
                {...register('id_number')}
                autoComplete="off"
                variant="outlined"
                type="text"
                label="ID number"
                fullWidth
                onChange={(e) =>
                  setPostVisitorlog({
                    ...postVisitorlog,
                    id: e.target.value,
                  })
                }
              />
            </Grid>

            {/* NAME */}
            <Grid item xs sm>
              <TextField
                {...register('visitorname')}
                autoComplete="off"
                variant="outlined"
                type="text"
                label="Name"
                error={errorName}
                fullWidth
                onChange={(e) =>
                  setPostVisitorlog({ ...postVisitorlog, name: e.target.value })
                }
              />
            </Grid>

            {/* COMPANY */}
            <Grid item xs sm>
              <FormControl required fullWidth error={errorCompany}>
                <InputLabel id="company">Company</InputLabel>
                <Select
                  {...register('company')}
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
                  {...register('company')}
                  error={otherCom}
                  required
                  name="company"
                  variant="outlined"
                  type="text"
                  fullWidth
                  label="Please input company"
                  onChange={(e) =>
                    setPostVisitorlog({
                      ...postVisitorlog,
                      company: e.target.value,
                    })
                  }
                />
=======
        {/* USER MUST SELECT COMPANY FIRST */}
        {!isShow ? (
          <Grid item xs sm alignSelf="center">
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Company</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="INTELLICARE/AVEGA"
                  control={<Radio />}
                  onChange={(e) => setCompanySelected(e.target.value)}
                  label="Intellicare/Avega"
                />
                <FormControlLabel
                  value="OTHERS"
                  onChange={(e) => setCompanySelected(e.target.value)}
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        ) : null}

        <Grid item xs sm>
          {companySelected === 'INTELLICARE/AVEGA' ? (
            <form autoComplete="off" noValidate onSubmit={handleSubmit(save)}>
              <Grid container direction="column" spacing={1}>
                {/* COMPANY */}
                <Grid item xs sm>
                  <FormControl fullWidth required error={!!errors.company}>
                    <InputLabel id="selected-input">Company</InputLabel>
                    <Controller
                      control={control}
                      defaultValue=""
                      name="company"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={onChange}
                          value={value}
                          id="select-area"
                          label="Company"
                        >
                          {companies.map((company) => (
                            <MenuItem key={company} value={company}>
                              {company}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

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
                    <InputLabel id="selected-input">Area</InputLabel>
                    <Controller
                      control={control}
                      defaultValue=""
                      name="area_visited"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={onChange}
                          value={value}
                          id="select-area"
                          label="Area"
                        >
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

                <Grid item xs sm>
                  <SignaturePad />
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
>>>>>>> eb03435a403428c763d59c671982d26ece91e0f6
              </Grid>
            </form>
          ) : companySelected === 'OTHERS' ? (
            <form noValidate autoComplete="off" onSubmit={handleSubmit(save)}>
              <Grid container direction="column" spacing={1}>
                <Grid item xs sm>
                  <Controller
                    name="company"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        variant="outlined"
                        type="text"
                        label="Please input company"
                        error={!!errors.company}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

<<<<<<< HEAD
            {/* AREA TO VISIT */}
            <Grid item xs sm>
              <FormControl fullWidth required error={errorArea}>
                <InputLabel id="area-to-visit">Area</InputLabel>
                <Select
                  {...register('area_to_visit')}
                  required
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
=======
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
>>>>>>> eb03435a403428c763d59c671982d26ece91e0f6

                {/* AREA TO VISIT */}
                <Grid item xs sm>
                  <FormControl fullWidth required error={!!errors.area_visited}>
                    <InputLabel id="selected-input">Area</InputLabel>
                    <Controller
                      control={control}
                      defaultValue=""
                      name="area_visited"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={onChange}
                          value={value}
                          id="select-area"
                          label="Area"
                        >
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
          ) : companySelected === '' ? null : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddNewLog;
