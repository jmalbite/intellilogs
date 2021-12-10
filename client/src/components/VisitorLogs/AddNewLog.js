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
<<<<<<< HEAD
  }, [companySelected]);

  // // useEffect(() => {
  // //   if (errorInSaving === false) {
  // //     handleClear();
  // //   }
  // // }, [errorInSaving]);

  const handleClear = () => {
    reset({
      company: '',
      area_visited: '',
      firstname: '',
      lastname: '',
      employee_code: '',
      purpose: '',
    });
    dispatch(clear_signature());
  };

  const save = (data) => {
    let visitorsData = data;
    const signature = userSign;
    const time_visited = new Date();

    //checking Signature
    if (!isSign) {
      visitorsData = { ...visitorsData, signature, time_visited };
      console.log(visitorsData);
      //dispatch(storeNewLog(visitorsData));
      //
    } else console.log('signature not yet filled');
  };
=======
  }, [internalOrOutsider]);
>>>>>>> c78f98e696213af6539afb44e27a5e8478b3771c

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
