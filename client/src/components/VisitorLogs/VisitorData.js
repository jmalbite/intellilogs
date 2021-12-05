import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getVisitorlogs } from '../../actions/visitor_action';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisitorTableHead from './VisitorTableHead';

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
            <TableRow key={row._id}>
              <TableCell>
                {row.employee_code ? row.employee_code : 'N/A'}
              </TableCell>
              <TableCell>{row.visitorname}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.area_visited}</TableCell>
              <TableCell>{row.purpose}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitorData;
