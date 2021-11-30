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
  company: yup.string().required(),
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
  const [tempCompany, setTempCompany] = useState('');

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
    if (e.target.value === 'OTHERS') {
      setTempCompany(e.target.value);
      setCompanySelected('');
    } else {
      setCompanySelected(e.target.value);
    }
  };

  // const handleClear = () => {
  //   setPostVisitorlog({
  //     employee_code: '',
  //     name: '',
  //     company: '',
  //     purpose: '',
  //     area_visited: '',
  //     signature: '',
  //   });
  //   dispatch(clear_signature());
  //   console.log('clear', postVisitorlog);
  // };

  // const handleChangeOthers = (e) => {
  //   setPostVisitorlog({ ...postVisitorlog, company: e.target.value });
  // };

  // //handle are component
  // const handleArea = (e) => {
  //   setPostVisitorlog({ ...postVisitorlog, area_visited: e.target.value });
  // };

  const save = async (data) => {
    let newData = data;
    const signature = userSign;
    if (!isSign) {
      newData = { ...newData, signature };
      dispatch(storeNewLog(newData));
    } else console.log('signature not yet filled');
  };

  return (
    <Grid item xs>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(save)}>
        <div>
          <Grid container direction="column" spacing={1}>
            <Grid item xs sm alignSelf="center">
              <Typography variant="h5" color="textPrimary">
                ADD LOG
              </Typography>
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
                    fullWidth
                  />
                )}
              />
            </Grid>
            {/* NAME */}
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

            {/* COMPANY */}
            <Grid item xs sm>
              <FormControl required error={!!errors.company} fullWidth>
                <InputLabel id="company-select">Company</InputLabel>
                <Select
                  value={tempCompany}
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

            {/* OTHERS IF COMPANY IS SELECTED AS 'OTHERS' */}
            {tempCompany === 'OTHERS' ? (
              <Grid item xs sm>
                <TextField
                  required
                  variant="outlined"
                  type="text"
                  label="company"
                  error={!!errors.company}
                  fullWidth
                  onChange={(e) => setCompanySelected(e.target.value)}
                />
              </Grid>
            ) : null}

            {/* AREA TO VISIT */}
            {/* <Grid item xs sm>
              <FormControl required error={errorArea} fullWidth>
                <InputLabel id="area-to-visit">Area</InputLabel>
                <Select
                  {...register('area_visited')}
                  labelId="area"
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
            </Grid> */}

            {/* PURPOSE */}
            {/* <Grid item xs sm>
              <TextField
                {...register('purpose')}
                required
                variant="outlined"
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
            </Grid> */}

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
                onClick={() => reset()}
                fullWidth
                variant="contained"
                color="primary"
              >
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
