import React, { useState, useEffect } from 'react';
import { IT_AREAS, OFFICE_COMPANIES } from '../Constant';
import SignaturePad from '../layout/Signaturepad';
import Feedback from '../Response components/Feedback';
import ProgressButton from '../Response components/ProgressButton';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { clear_signature } from '../../actions/global_action';
import { storeNewLog } from '../../actions/visitor_action.js';
import {
  Grid,
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

const schema = yup.object().shape({
  employee_code: yup.string().required(),
  company: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  area_visited: yup.string().required(),
  purpose: yup.string().required(),
});

const InternalForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const userSign = useSelector((state) => state.user_signature);
  const errorInSaving = useSelector((state) => state.isErrorSaving);
  const companies = OFFICE_COMPANIES;
  const areas = IT_AREAS;
  const dispatch = useDispatch();
  const [isSign, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //checking if signature pad was filled - checking in redux reducer
    if (userSign === '') setIsSigned(true);
    else setIsSigned(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  useEffect(() => {
    if (errorInSaving === false) {
      setIsLoading(false);

      //call clear function when no error in saving log
      handleClear();
    } else setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorInSaving]);

  function handleClear() {
    reset({
      company: '',
      area_visited: '',
      firstname: '',
      lastname: '',
      employee_code: '',
      purpose: '',
    });
    dispatch(clear_signature());
  }

  const save = (data) => {
    let visitorData = data;

    if (!isSign) {
      setIsLoading(true);
      visitorData = {
        ...visitorData,
        visitor_id: uuidv4(),
        signature: userSign,
        time_visited: new Date(),
      };

      dispatch(storeNewLog(visitorData));
    } else console.log('signature not yet filled');
  };

  return (
    <>
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
                  required
                  fullWidth
                />
              )}
            />
          </Grid>

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

          {/* VISITOR FIRSTNAME */}
          <Grid item xs sm>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  required
                  variant="outlined"
                  type="text"
                  label="Firstname"
                  error={!!errors.firstname}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* VISITOR LASTNAME */}
          <Grid item xs sm>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  required
                  variant="outlined"
                  type="text"
                  label="Lastname"
                  error={!!errors.lastname}
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
              disabled={isLoading}
            >
              Save Log
            </Button>
            {isLoading && <ProgressButton loading={isLoading} />}
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

          <Grid item xs sm>
            <Feedback status={errorInSaving} />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default InternalForm;
