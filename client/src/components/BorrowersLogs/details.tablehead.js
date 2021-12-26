import React from 'react';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';
import { TableHead, TableRow, TableCell, Typography } from '@mui/material';

const useStyles = makeStyles({
  head: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.info.main,
    fontWeight: 'bold',
  },
});

const DetailsTableHeads = () => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.head}>
          <Typography fontWeight="700" color="white">
            Handed By
          </Typography>
        </TableCell>

        <TableCell className={classes.head}>
          <Typography fontWeight="700" color="white">
            Borrowers Signature
          </Typography>
        </TableCell>

        <TableCell className={classes.head}>
          <Typography fontWeight="700" color="white">
            Returned to / Received by
          </Typography>
        </TableCell>

        <TableCell className={classes.head}>
          <Typography fontWeight="700" color="white">
            Borrowers Signature (after returned)
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DetailsTableHeads;
