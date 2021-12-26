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
            <TableCell>
              {!item.receivedBy && '--- --- ---'}
              {item.receivedBy && item.receivedBy}
            </TableCell>
            <TableCell>
              {!item.borrowerSignatureReturned && '--- --- ---'}
              {item.borrowerSignatureReturned && (
                <img
                  src={item.borrowerSignature}
                  style={{ width: '50px', height: '40px' }}
                  alt="signature"
                />
              )}
            </TableCell>
            <TableCell>
              {item.status === 'BORROWED' && 'Edit'}
              {item.status === 'RETURNED' && 'done'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailsData;
