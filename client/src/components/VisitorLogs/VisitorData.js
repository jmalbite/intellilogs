import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitorlogs } from '../../actions/visitor_action';
import { styled } from '@mui/material/styles';
import VisitorTableHead from './VisitorTableHead';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
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

const VisitorData = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.visitorsLogsData);

  useEffect(() => {
    dispatch(getVisitorlogs());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        {/* Table Head */}
        <VisitorTableHead />

        <TableBody>
          {visitors.map((row) => (
            <StyledTableRow key={row._id}>
              <TableCell>
                {row.employee_code ? row.employee_code.toUpperCase() : 'N/A'}
              </TableCell>
              <TableCell>
                {row.firstname.toUpperCase()} {row.lastname.toUpperCase()}
              </TableCell>
              <TableCell>{row.company.toUpperCase()}</TableCell>
              <TableCell>{row.area_visited}</TableCell>
              <TableCell>{row.purpose.toUpperCase()}</TableCell>
              <TableCell>{moment(row.time_visited).format('lll')}</TableCell>
              <TableCell>
                <div className="img">
                  <img
                    src={row.signature}
                    style={{ width: '60px', height: '40px' }}
                    alt="signature"
                  />
                </div>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitorData;
