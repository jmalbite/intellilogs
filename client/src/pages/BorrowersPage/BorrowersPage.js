import React, { useState } from 'react';
import AddLogBorrowers from '../../components/BorrowersLogs/addnewlog.borrowers';
import {
  Grid,
  TextField,
  Container,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearInOrOutState,
  clear_signature,
} from '../../actions/visitor_action';

const useStyles = makeStyles({
  toolbar: {
    marginTop: '70px',
  },
});

const BorrowersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const isBorrowersChoose = useSelector((state) => state.internalOrOutsider);
  const isSign = useSelector((state) => state.user_signature);
  const openForm = () => setForm(true);
  const closeForm = () => {
    setForm(false);

    if (isSign) dispatch(clear_signature());
    if (isBorrowersChoose) dispatch(clearInOrOutState());

    // dispatch(getVisitorlogs());
  };

  return (
    <>
      <Container className={classes.toolbar} maxWidth="xl">
        <Typography variant="h5" color="secondary" fontWeight="bold">
          BORROWERS LOGS
        </Typography>

        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item md={5}>
              <TextField
                autoComplete="off"
                type="search"
                id="searchLog"
                label="Search"
                variant="outlined"
                placeholder="Search ID, Name, Company, Area"
                size="medium"
                //onChange={(e) => requestSearch(e.target.value)}
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
                <DialogContent>
                  <AddLogBorrowers />
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BorrowersPage;
