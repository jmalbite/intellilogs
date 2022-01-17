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
  const details = useSelector((state) => state.itemLogDetails);

  return (
    <TableContainer>
      <Table>
        <DetailsTableHeads />
        <TableBody>
          <TableRow>
            <TableCell>{details.handed_by}</TableCell>
            <TableCell>
              <img
                src={details.signature}
                style={{ width: '50px', height: '40px' }}
                alt="signature"
              />
            </TableCell>
            <TableCell>
              {!details.received_by && '--- --- ---'}
              {details.received_by && details.received_by}
            </TableCell>
            <TableCell>
              {!details.signature_returned && '--- --- ---'}
              {details.signature_returned && (
                <img
                  src={details.signature_returned}
                  style={{ width: '50px', height: '40px' }}
                  alt="signature"
                />
              )}
            </TableCell>

            <TableCell>
              {!details.remarks && '--- --- ---'}
              {details.remarks && details.remarks}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailsData;
