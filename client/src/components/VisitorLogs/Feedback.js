import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearErrorState } from '../../actions/visitor_action';
import MessageSuccess from './MessageSuccess';
import MessageError from './MessageError';

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

  if (open) return <MessageError open={open} handleClick={handleClick} />;
  else return <MessageSuccess open={open} handleClick={handleClick} />;
};

export default Feedback;
