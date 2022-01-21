import React, { useState } from 'react';
import { Typography } from '@mui/material';
import ReturnItemForm from './returnitem.form';
import { makeStyles } from '@mui/styles';

import theme from '../../theme/Theme';

const ItemStatus = (props) => {
  const { status, id } = props;

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
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  if (status === 'BORROWED') {
    return (
      <>
        <Typography variant="h5" className={classes.statusBORROWED} onClick={openForm}>
          {status}
        </Typography>

        <ReturnItemForm borrowerID={id} openForm={open} closeForm={closeForm} />
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h5" className={classes.statusRETURNED}>
          {status}
        </Typography>
      </>
    );
  }
};

export default ItemStatus;
