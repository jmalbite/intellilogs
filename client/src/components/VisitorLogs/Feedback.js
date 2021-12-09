import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { clearErrorState } from '../../actions/visitor_action';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Feedback = ({ status }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  //checking the status during POSTING data to database and returning to null value of 'status' state.
  useEffect(() => {
    if (status === true) {
      setOpen(true);
      setTimeout(() => {
        dispatch(clearErrorState());
      }, 2000);
    } else if (status === false) {
      setOpen(true);
      setTimeout(() => {
        dispatch(clearErrorState());
      }, 2000);
    } else setOpen(false);
  }, [status, dispatch]);

  return (
    <>
      {status === true ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClick}>
          <Alert variant="filled" severity="error" onClose={handleClick}>
            <Typography fontWeight="bold" variant="subtitle1">
              Error in saving log!
            </Typography>
          </Alert>
        </Snackbar>
      ) : status === false ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClick}>
          <Alert variant="filled" severity="success" onClose={handleClick}>
            <Typography fontWeight="bold" variant="subtitle1">
              Log Successfully Saved!
            </Typography>
          </Alert>
        </Snackbar>
      ) : status === null ? null : null}
    </>
  );
};

export default Feedback;
