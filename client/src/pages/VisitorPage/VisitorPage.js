import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Container, Button, Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisitorData from '../../components/VisitorLogs/VisitorData';
import AddNewLog from '../../components/VisitorLogs/AddNewLog';
import { getVisitorlogs } from '../../actions/visitor_action';
import { clear_signature, clearInOrOutState } from '../../actions/global_action';

const useStyles = makeStyles({
  toolbar: {
    marginTop: '90px',
  },
});

const VisitorPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSign = useSelector((state) => state.user_signature);
  const isVisitorChoose = useSelector((state) => state.internalOrOutsider);
  const originalRows = useSelector((state) => state.visitorsLogsData);
  const [rows, setRows] = useState(originalRows);
  const [form, setForm] = useState(false);

  const requestSearch = (searchValue) => {
    const filterRows = originalRows.filter((row) => {
      let fullName = row.firstname + ' ' + row.lastname;
      return (
        fullName.toLocaleLowerCase().includes(searchValue.toLowerCase()) ||
        row.company.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.area_visited.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.employee_code.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setRows(filterRows);
  };

  useEffect(() => {
    setRows(originalRows);
  }, [setRows, originalRows]);

  useEffect(() => {
    dispatch(getVisitorlogs());
  }, [dispatch]);

  const openForm = () => setForm(true);
  const closeForm = () => {
    setForm(false);

    if (isSign) dispatch(clear_signature());
    if (isVisitorChoose) dispatch(clearInOrOutState());

    dispatch(getVisitorlogs());
  };

  return (
    <>
      <Container className={classes.toolbar} maxWidth="xl">
        {/* <Typography variant="h5" color="secondary" fontWeight="bold">
          VISITORS LOGS
        </Typography> */}
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
                <AddNewLog />
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
        <VisitorData visitors={rows} />
      </Container>
    </>
  );
};

export default VisitorPage;
