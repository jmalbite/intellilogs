import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { clear_signature } from '../../actions/visitor_action';

const useStyles = makeStyles({
  toolbar: {
    marginTop: '90px',
  },
});

const VisitorPage = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);

  const openForm = () => setForm(true);
  const closeForm = () => {
    setForm(false);
    dispatch(clear_signature());
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
