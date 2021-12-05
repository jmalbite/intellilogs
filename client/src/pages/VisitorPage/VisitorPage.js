import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Container,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisitorData from '../../components/VisitorLogs/VisitorData';
import { clear_signature, getVisitorlogs } from '../../actions/visitor_action';

const useStyles = makeStyles({
  toolbar: {
    marginTop: '90px',
  },
});

const VisitorPage = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSign = useSelector((state) => state.user_signature);
  const [form, setForm] = useState(false);

  const openForm = () => setForm(true);
  const closeForm = () => {
    setForm(false);
    if (isSign) dispatch(clear_signature());
    dispatch(getVisitorlogs());
  };

  return (
    <div>
      <Container className={classes.toolbar} maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item md={5}>
            <TextField
              id="searchLog"
              label="Search log"
              variant="outlined"
              size="medium"
              fullWidth
            />
          </Grid>

          <Grid item xs={2} md={2}>
            <Button
              onClick={openForm}
              variant="contained"
              size="medium"
              fullWidth
            >
              New Log
            </Button>
            <Dialog fullWidth open={form} onClose={closeForm}>
              <DialogContent>{children}</DialogContent>
            </Dialog>
          </Grid>
        </Grid>
        <VisitorData />
      </Container>
    </div>
  );
};

export default VisitorPage;
