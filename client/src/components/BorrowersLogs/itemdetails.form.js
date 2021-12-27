import React from 'react';
import Feedback from '../Response components/Feedback';
import DetailsData from './details.data';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const ItemDetailsForm = ({ openForm, closeForm }) => {
  const errorInSaving = useSelector((state) => state.isErrorSaving);
  return (
    <Dialog maxWidth="lg" fullWidth open={openForm} onClose={closeForm}>
      <DialogTitle>
        <div>
          <Typography variant="h6" fontWeight="bold">
            MORE DETAILS
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {/* Display additonal data */}
        <DetailsData />
      </DialogContent>
      <Feedback status={errorInSaving} />
    </Dialog>
  );
};

export default ItemDetailsForm;
