import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableSortLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';

const useStyles = makeStyles({
  tablehead: {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
});

const VisitorTableHead = (props) => {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;
  const classes = useStyles();

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tablehead}>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            ID number
          </Typography>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === 'firstname'}
            direction={valueToOrderBy === 'firstname' ? orderDirection : 'asc'}
            onClick={createSortHandler('firstname')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Name
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === 'company'}
            direction={valueToOrderBy === 'company' ? orderDirection : 'asc'}
            onClick={createSortHandler('company')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Company
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === 'area_visited'}
            direction={
              valueToOrderBy === 'area_visited' ? orderDirection : 'asc'
            }
            onClick={createSortHandler('area_visited')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Area to visit
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Purpose
          </Typography>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={valueToOrderBy === 'time_visited'}
            direction={
              valueToOrderBy === 'time_visited' ? orderDirection : 'asc'
            }
            onClick={createSortHandler('time_visited')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Date & Time Visited
            </Typography>
          </TableSortLabel>
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
