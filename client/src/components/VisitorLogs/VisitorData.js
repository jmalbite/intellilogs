import React from 'react';
import faker from 'faker';
import moment from 'moment';

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

const SampleVisitors = [];
const useStyles = makeStyles({
  tableContainer: {
    marginTop: '20px',
  },

  table: {
    minWidth: 650,
  },
});

for (let i = 0; i < 14; i++) {
  SampleVisitors[i] = {
    Id_number: faker.datatype.number(),
    Name: faker.name.findName().toUpperCase(),
    Company: faker.company.companySuffix(),
    Area_to_visit: faker.address.country(),
    Purpose: faker.lorem.word(),
    Date: moment(faker.date.recent()).format('lll'),
    Signature: faker.image.abstract(),
  };
}

const VisitorData = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        {/* Table Head */}
        <VisitorTableHead />

        <TableBody>
          {SampleVisitors.map((row) => (
            <TableRow key={row.Id_number}>
              <TableCell>{row.Id_number}</TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.Company}</TableCell>
              <TableCell>{row.Area_to_visit}</TableCell>
              <TableCell>{row.Purpose}</TableCell>
              <TableCell>{row.Date}</TableCell>
              <TableCell>
                <div className="img">
                  <img
                    src={row.Signature}
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
