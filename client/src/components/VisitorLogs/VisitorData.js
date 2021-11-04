import React from 'react';
import faker from 'faker';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';

const SampleVisitors = [];
const useStyles = makeStyles({
  tableContainer: {
    marginTop: '20px',
  },

  table: {
    minWidth: 650,
  },

  tablehead: {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
});

for (let i = 0; i < 14; i++) {
  SampleVisitors[i] = {
    Id_number: faker.datatype.number(),
    Name: faker.name.findName().toUpperCase(),
    Company: faker.company.companySuffix(),
    Area_to_visit: faker.address.country(),
    Purpose: faker.lorem.word(),
    Signature: faker.image.abstract(),
  };
}

const VisitorData = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="700" color="white">
                ID number
              </Typography>
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Area to visit</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Signature</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {SampleVisitors.map((row) => (
            <TableRow key={row.Id_number}>
              <TableCell>{row.Id_number}</TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.Company}</TableCell>
              <TableCell>{row.Area_to_visit}</TableCell>
              <TableCell>{row.Purpose}</TableCell>
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
