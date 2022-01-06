import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ItemDetailsForm from './itemdetails.form';
import ReturnItemForm from './returnitem.form';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  getItemDetails,
  clearItemDetails,
  getBorrowersLogs,
} from '../../actions/borrowers_action';
import theme from '../../theme/Theme';

const ItemStatus = (props) => {
  const { logInfo } = props;

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
      borrowerID: logInfo.borrowers_id,
      status: logInfo.item_status,
      handedBy: logInfo.handed_by,
      borrowerSignature: logInfo.borrowers_signature,
      receivedBy: logInfo.received_by,
      borrowerSignatureReturned: logInfo.borrowers_signature_returned,
      itemRemarks: logInfo.item_remarks,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logInfo.item_status]);

  const openForm = () => {
    dispatch(getItemDetails(itemDetails));
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
    dispatch(clearItemDetails());
    dispatch(getBorrowersLogs());
  };

  if (logInfo.item_status === 'BORROWED') {
    return (
      <>
        <Typography
          variant="h5"
          className={classes.statusBORROWED}
          onClick={openForm}
        >
          {logInfo.item_status}
        </Typography>

        <ReturnItemForm openForm={open} closeForm={closeForm} />
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h5" className={classes.statusRETURNED}>
          {logInfo.item_status}
        </Typography>
      </>
    );
  }
};

export default ItemStatus;
