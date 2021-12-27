import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ItemDetailsForm from './itemdetails.form';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  getItemDetails,
  clearItemDetails,
  getBorrowersLogs,
} from '../../actions/borrowers_action';
import theme from '../../theme/Theme';

const ItemStatus = (props) => {
  const {
    status,
    borrowerID,
    handedBy,
    borrowerSignature,
    receivedBy,
    borrowerSignatureReturned,
  } = props;

  const useStyles = makeStyles({
    statusBORROWED: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block',

      '&:hover, &:focus': {
        cursor: 'pointer',
        backgroundColor: theme.palette.info.light,
      },
    },

    statusRETURNED: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block',

      '&:hover, &:focus': {
        cursor: 'pointer',
        backgroundColor: theme.palette.info.light,
      },
    },
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const [itemDetails, setItemDetails] = useState([]);
  const [open, setOpen] = useState(false);

  //set item details from props data
  useEffect(() => {
    setItemDetails({
      ...itemDetails,
      borrowerID,
      status,
      handedBy,
      borrowerSignature,
      receivedBy,
      borrowerSignatureReturned,
    });
    console.log('render');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, receivedBy, borrowerSignatureReturned]);

  const openForm = () => {
    dispatch(getItemDetails(itemDetails));
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
    dispatch(clearItemDetails());
    dispatch(getBorrowersLogs());
  };

  if (status === 'BORROWED') {
    return (
      <>
        <Typography
          variant="h5"
          className={classes.statusBORROWED}
          onClick={openForm}
        >
          {status}
        </Typography>

        <ItemDetailsForm openForm={open} closeForm={closeForm} />
      </>
    );
  } else {
    return (
      <>
        <Typography
          variant="h5"
          className={classes.statusRETURNED}
          onClick={openForm}
        >
          {status}
        </Typography>

        <ItemDetailsForm openForm={open} closeForm={closeForm} />
      </>
    );
  }
};

export default ItemStatus;
