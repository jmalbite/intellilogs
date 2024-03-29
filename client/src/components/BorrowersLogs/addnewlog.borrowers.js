import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import Question from '../layout/Question';
import InternalFormBorrowers from './internalform.borrowers';
import OutsiderFormBorrowers from './outsider.borrowers';

const AddLogBorrowers = () => {
  const internalOrOutsider = useSelector((state) => state.internalOrOutsider);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (internalOrOutsider) setIsShow(true);
    else setIsShow(false);
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
        {!isShow && <Question />}

        <Grid item xs sm>
          {internalOrOutsider === 'YES' && <InternalFormBorrowers />}
          {internalOrOutsider === 'NO' && <OutsiderFormBorrowers />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddLogBorrowers;
