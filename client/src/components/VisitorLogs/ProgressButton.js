import React from 'react';

import { CircularProgress, Backdrop } from '@mui/material';

function ProgressButton({ loading }) {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}

export default ProgressButton;
