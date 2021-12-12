import React from 'react';
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
  },

  table: {
    minWidth: 650,
  },
});

const VisitorData = ({ visitors }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        {/* Table Head */}
        <VisitorTableHead />

        <TableBody>
          {visitors.map((row) => (
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
                  style={{ width: '40px', height: '20px' }}
                  alt="signature"
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justifyContent="center">
        {!visitors.length && (
          <Typography variant="h6">No data found!</Typography>
        )}
      </Grid>
    </TableContainer>
  );
};

export default VisitorData;
