import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ItemDetailsForm from './itemdetails.form';
import { Typography } from '@mui/material';
import Info from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';
import {
  getItemDetails,
  clearItemDetails,
} from '../../actions/borrowers_action';

const useStyles = makeStyles({
  moreInfo: {
    fontWeight: 'bold',
    fontSize: '0.80rem',
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

const ItemInfo = (props) => {
  const { info } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const openInfo = () => {
    setOpen(true);
    dispatch(getItemDetails(details));
  };
  const closeInfo = () => {
    setOpen(false);
    dispatch(clearItemDetails());
  };

  useEffect(() => {
    setDetails({
      ...details,
      handed_by: info.handed_by,
      signature: info.signature,
      received_by: info.received_by,
      signature_returned: info.signature_returned,
      remarks: info.remarks,
      status: info.status,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.status]);

  return (
    <div>
      <Typography onClick={openInfo} className={classes.moreInfo}>
        more info
        <Info className={classes.info} fontSize="inherit" />
      </Typography>

      <ItemDetailsForm logInfo={info} openForm={open} closeForm={closeInfo} />
    </div>
  );
};

export default ItemInfo;
