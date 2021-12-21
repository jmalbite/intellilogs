import React, { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.js';
import Feedback from './Feedback.js';
import ProgressButton from './ProgressButton.js';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { clear_signature, storeNewLog } from '../../actions/visitor_action.js';
import {
  Grid,
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

const areas = ['IT WORKSTATIONS', 'STOCK ROOM', 'SERVER ROOM'];

const schema = yup.object().shape({
  company: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  area_visited: yup.string().required(),
  purpose: yup.string().required(),
});

const OutsiderForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const userSign = useSelector((state) => state.user_signature);
  const errorInSaving = useSelector((state) => state.isErrorSaving);
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
        employee_code: 'N/A',
      };

      dispatch(storeNewLog(visitorData));
    } else console.log('signature not yet filled');
  };

  return (
    <>
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

          {/* VISITOR NAME FIRSTNAME */}
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

          {/* VISITOR NAME LASTNAME */}
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

export default OutsiderForm;
