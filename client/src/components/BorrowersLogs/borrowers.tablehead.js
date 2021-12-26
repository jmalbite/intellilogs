import React from 'react';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableSortLabel,
} from '@mui/material';

const useStyles = makeStyles({
  head: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.info.main,
    fontWeight: 'bold',
  },
});

const BorrowersTableHead = (props) => {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;
  const classes = useStyles();

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.head}>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            ID number
          </Typography>
        </TableCell>

        <TableCell className={classes.head}>
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

        <TableCell className={classes.head}>
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

        <TableCell className={classes.head}>
          <TableSortLabel
            active={valueToOrderBy === 'item_borrowed'}
            direction={
              valueToOrderBy === 'item_borrowed' ? orderDirection : 'asc'
            }
            onClick={createSortHandler('item_borrowed')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Item
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell className={classes.head}>
          <TableSortLabel
            active={valueToOrderBy === 'date_time_borrowed'}
            direction={
              valueToOrderBy === 'date_time_borrowed' ? orderDirection : 'asc'
            }
            onClick={createSortHandler('date_time_borrowed')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Date & time borrowed
            </Typography>
          </TableSortLabel>
        </TableCell>

        {/* <TableCell className={classes.head}>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Signature during borrowed
          </Typography>
        </TableCell> */}

        <TableCell className={classes.head}>
          <TableSortLabel
            active={valueToOrderBy === 'time_visited'}
            direction={
              valueToOrderBy === 'time_visited' ? orderDirection : 'asc'
            }
            onClick={createSortHandler('time_visited')}
          >
            <Typography variant="subtitle2" fontWeight="700" color="white">
              Date & time returned
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell className={classes.head}>
          <Typography variant="subtitle2" fontWeight="700" color="white">
            Status
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BorrowersTableHead;
