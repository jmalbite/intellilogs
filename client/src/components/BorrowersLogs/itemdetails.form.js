import React from 'react';
import DetailsData from './details.data';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const ItemDetailsForm = ({ openForm, closeForm }) => {
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
    </Dialog>
  );
};

export default ItemDetailsForm;
