/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import InternalForm from './InternalForm.js';
import OutsiderForm from './OutsiderForm.js';
import {
  Grid,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

//Add new log component
const AddNewLog = () => {
  const [isShow, setIShow] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (!!question) setIShow(true);
    else setIShow(false);
  }, [question]);

  return (
    <Grid item xs>
      <Grid container direction="column" spacing={1}>
        <Grid item xs sm alignSelf="center">
          <Typography variant="h5" color="textPrimary">
            ADD Log
          </Typography>
        </Grid>

        {/* USER MUST SELECT COMPANY FIRST */}
        {!isShow ? (
          <Grid item xs sm alignSelf="center">
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Are you a Intellicare/Avega employee?
              </FormLabel>
              <Grid container justifyContent="center">
                <RadioGroup row name="row-radio-buttons-group">
                  <Grid item xs sm>
                    <FormControlLabel
                      value="YES"
                      control={<Radio />}
                      onChange={(e) => setQuestion(e.target.value)}
                      label="YES"
                    />
                  </Grid>
                  <Grid item xs sm>
                    <FormControlLabel
                      value="NO"
                      onChange={(e) => setQuestion(e.target.value)}
                      control={<Radio />}
                      label="NO"
                    />
                  </Grid>
                </RadioGroup>
              </Grid>
            </FormControl>
          </Grid>
        ) : null}

        <Grid item xs sm>
          {question === 'YES' ? (
            <InternalForm />
          ) : question === 'NO' ? (
            <OutsiderForm />
          ) : question === '' ? null : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddNewLog;
