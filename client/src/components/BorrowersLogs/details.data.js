import React from 'react';
import { useSelector } from 'react-redux';
import DetailsTableHeads from './details.tablehead';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

const DetailsData = () => {
  const item = useSelector((state) => state.itemLogDetails);

  return (
    <TableContainer>
      <Table>
        <DetailsTableHeads />
        <TableBody>
          <TableRow>
            <TableCell>{item.handedBy}</TableCell>
            <TableCell>
              <img
                src={item.borrowerSignature}
                style={{ width: '50px', height: '40px' }}
                alt="signature"
              />
            </TableCell>
            <TableCell>{item.receivedBy}</TableCell>
            <TableCell>
              <img
                src={item.borrowerSignatureReturned}
                style={{ width: '50px', height: '40px' }}
                alt="signature"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailsData;
