import React, { useState, useEffect } from 'react';
import ItemDetailsForm from './itemdetails.form';
import { Typography } from '@mui/material';
import Info from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/Theme';

const useStyles = makeStyles({
  moreInfo: {
    fontWeight: 'bold',
    fontSize: '0.90em',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 8,
    padding: '3px 10px',
    display: 'flex',
    justifyContent: 'space-between',

    '&:hover, &:focus': {
      cursor: 'pointer',
      backgroundColor: theme.palette.info.light,
    },
  },
});

const ItemInfo = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openInfo = () => setOpen(true);
  const closeInfo = () => setOpen(false);

  return (
    <div>
      <Typography onClick={openInfo} className={classes.moreInfo}>
        more info
        <Info fontSize="inherit" />
      </Typography>

      <ItemDetailsForm openForm={open} closeForm={closeInfo} />
    </div>
  );
};

export default ItemInfo;
