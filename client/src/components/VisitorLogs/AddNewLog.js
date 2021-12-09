/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import InternalForm from './InternalForm.js';
import OutsiderForm from './OutsiderForm.js';
import Question from './Question.js';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

//Add new log component
const AddNewLog = () => {
  const internalOrOutsider = useSelector((state) => state.internalOrOutsider);
  const [isShow, setIShow] = useState(false);

  useEffect(() => {
    if (!!internalOrOutsider) setIShow(true);
    else setIShow(false);
  }, [internalOrOutsider]);

  return (
    <Grid item xs>
      <Grid container direction="column" spacing={1}>
        <Grid item xs sm alignSelf="center">
          <Typography variant="h5" color="textPrimary">
            ADD Log
          </Typography>
        </Grid>

        {/* USER MUST SELECT COMPANY FIRST */}
        {!isShow ? <Question /> : null}

        <Grid item xs sm>
          {internalOrOutsider === 'YES' ? (
            <InternalForm />
          ) : internalOrOutsider === 'NO' ? (
            <OutsiderForm />
          ) : internalOrOutsider === '' ? null : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddNewLog;
