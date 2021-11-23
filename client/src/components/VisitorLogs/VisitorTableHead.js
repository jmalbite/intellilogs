import React from 'react';
import { TableHead, TableRow, TableCell, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';

const useStyles = makeStyles({
  tablehead: {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
});

const VisitorTableHead = () => {
  const classes = useStyles();

  return (
    <TableHead className={classes.tablehead}>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            ID number
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Name
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Company
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Area to visit
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Purpose
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Date & Time Visited
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Signature
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default VisitorTableHead;
