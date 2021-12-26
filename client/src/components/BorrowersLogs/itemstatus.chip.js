import React, { useEffect, useState } from 'react';
import { Chip, Typography } from '@mui/material';
import UpdateLog from './updatelog.form';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  getItemDetails,
  clearItemDetails,
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
    status: {
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
      handedBy,
      borrowerSignature,
      receivedBy,
      borrowerSignatureReturned,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openForm = () => {
    dispatch(getItemDetails(itemDetails));
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
    dispatch(clearItemDetails());
  };

  if (status === 'BORROWED') {
    return (
      <>
        <Typography variant="h5" className={classes.status} onClick={openForm}>
          {status}
        </Typography>

        <UpdateLog openForm={open} closeForm={closeForm} />
      </>
    );
  } else {
    return <Chip label={status} color="secondary" variant="filled" />;
  }
};

export default ItemStatus;
