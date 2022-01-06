import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReturnItemForm from './returnitem.form';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import DetailsTableHeads from './details.tablehead';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
} from '@mui/material';

const DetailsData = () => {
  const item = useSelector((state) => state.itemLogDetails);
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
  };

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
                  src={item.borrowerSignatureReturned}
                  style={{ width: '50px', height: '40px' }}
                  alt="signature"
                />
              )}
            </TableCell>

            <TableCell>
              {!item.itemRemarks && '--- --- ---'}
              {item.itemRemarks && item.itemRemarks}
            </TableCell>

            <TableCell>
              {/* CHECK STATUS IF BORROWED RENDER THE FOLLOWING JSX */}
              {item.status === 'BORROWED' && (
                <>
                  <Chip
                    icon={<EditIcon fontSize="small" />}
                    label="Return Item"
                    color="info"
                    onClick={openForm}
                  />
                  <ReturnItemForm
                    openForm={open}
                    closeForm={closeForm}
                    borrowerID={item.borrowerID}
                  />
                </>
              )}

              {/* CHECK STATUS IF RETURNED RENDER THE FOLLOWING JSX */}
              {item.status === 'RETURNED' && (
                <CheckCircleOutlineTwoToneIcon
                  fontSize="medium"
                  color="secondary"
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailsData;
