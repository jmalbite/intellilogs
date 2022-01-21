import React, { useEffect, useState } from 'react';
import AddLogBorrowers from '../../components/BorrowersLogs/addnewlog.borrowers';
import BorrowersData from '../../components/BorrowersLogs/borrowers.data';

import { Grid, TextField, Container, Button, Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getBorrowersLogs } from '../../actions/borrowers_action';
import { clearInOrOutState, clear_signature } from '../../actions/global_action';

const useStyles = makeStyles({
  toolbar: {
    marginTop: '90px',
  },
});

const BorrowersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const isBorrowersChoose = useSelector((state) => state.internalOrOutsider);
  const isSign = useSelector((state) => state.user_signature);
  const originalRows = useSelector((state) => state.borrowersLogsData);
  const [rows, setRows] = useState(originalRows);

  //searching specific data
  const requestSearch = (searchValue) => {
    const filterRows = originalRows.filter((row) => {
      let fullName = row.firstname + ' ' + row.lastname;

      return (
        fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.company.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.item_borrowed.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.date_time_borrowed.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.date_time_returned.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setRows(filterRows);
  };

  useEffect(() => {
    setRows(originalRows);
  }, [setRows, originalRows]);

  const openForm = () => setForm(true);
  const closeForm = () => {
    setForm(false);

    if (isSign) dispatch(clear_signature());
    if (isBorrowersChoose) dispatch(clearInOrOutState());

    dispatch(getBorrowersLogs());
  };

  useEffect(() => {
    dispatch(getBorrowersLogs());
  }, [dispatch]);

  return (
    <>
      <Container className={classes.toolbar} maxWidth="xl">
        {/* <Typography variant="h5" color="secondary" fontWeight="bold">
          BORROWERS LOGS
        </Typography> */}

        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item md={5}>
            <TextField
              autoComplete="off"
              type="search"
              id="searchLog"
              label="Search"
              variant="outlined"
              placeholder="Name, Company, Asset, Date borrowed, Date returned"
              size="medium"
              onChange={(e) => requestSearch(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={2} md={2}>
            <Button onClick={openForm} variant="contained" size="medium" fullWidth>
              New Log
            </Button>
            <Dialog fullWidth open={form} onClose={closeForm}>
              <DialogContent>
                <AddLogBorrowers />
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>

        <BorrowersData borrowers={rows} />
      </Container>
    </>
  );
};

export default BorrowersPage;
