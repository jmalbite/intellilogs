import React from 'react';
import { Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MessageError = ({ handleClick, open }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClick}>
      <Alert variant="filled" severity="error" onClose={handleClick}>
        <Typography fontWeight="bold" variant="subtitle1">
          Error in saving log!
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default MessageError;
