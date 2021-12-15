import React, { useState } from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import VisitorTableHead from './VisitorTableHead';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles({
  tableContainer: {
    marginTop: '20px',
    height: '70vh',
  },

  table: {
    minWidth: 650,
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((element, index) => [element, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((element) => element[0]);
};

const VisitorData = ({ visitors }) => {
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = useState('desc');
  const [valueToOrderBy, setValueToOrderBy] = useState('time_visited');

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        {/* Table Head */}
        <VisitorTableHead
          valueToOrderBy={valueToOrderBy}
          orderDirection={orderDirection}
          handleRequestSort={handleRequestSort}
        />

        <TableBody>
          {sortedRowInformation(
            visitors,
            getComparator(orderDirection, valueToOrderBy)
          ).map((visitor, index) => (
            <StyledTableRow key={index}>
              <TableCell onClick={() => console.log('clicked')}>
                {visitor.employee_code}
              </TableCell>
              <TableCell>
                {visitor.firstname.toUpperCase()}{' '}
                {visitor.lastname.toUpperCase()}{' '}
              </TableCell>
              <TableCell>{visitor.company.toUpperCase()}</TableCell>
              <TableCell>{visitor.area_visited}</TableCell>
              <TableCell>{visitor.purpose.toUpperCase()}</TableCell>
              <TableCell>
                {moment(visitor.time_visited).format('lll')}
              </TableCell>
              <TableCell>
                <img
                  src={visitor.visitor_signature}
                  style={{ width: '40px', height: '25px' }}
                  alt="signature"
                />
              </TableCell>
            </StyledTableRow>
          ))}

          {/* {visitors.map((row) => (
            <StyledTableRow key={row._id}>
              <TableCell>{row.employee_code}</TableCell>
              <TableCell>
                {row.firstname.toUpperCase()} {row.lastname.toUpperCase()}
              </TableCell>
              <TableCell>{row.company.toUpperCase()}</TableCell>
              <TableCell>{row.area_visited}</TableCell>
              <TableCell>{row.purpose.toUpperCase()}</TableCell>
              <TableCell>{moment(row.time_visited).format('lll')}</TableCell>
              <TableCell>
                <img
                  src={row.signature}
                  style={{ width: '40px', height: '25px' }}
                  alt="signature"
                />
              </TableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
      <Grid container justifyContent="center">
        {!visitors.length && (
          <Typography variant="subtitle1" fontSize="25px">
            No data found!
          </Typography>
        )}
      </Grid>
    </TableContainer>
  );
};

export default VisitorData;
