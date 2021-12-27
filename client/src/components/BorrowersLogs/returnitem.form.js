import React, { useState, useEffect } from 'react';
import { IT_STAFFS } from '../Constant';
import Signaturepad from '../layout/Signaturepad';
import ProgressButton from '../Response components/ProgressButton';
import Feedback from '../Response components/Feedback';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { clear_signature } from '../../actions/global_action';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Grid,
} from '@mui/material';
import { updateLog } from '../../actions/borrowers_action';

const schema = yup.object().shape({
  received_by: yup.string().required(),
  item_status: yup.string().required(),
  item_remarks: yup.string().notRequired(),
});

const ReturnItemForm = (props) => {
  //initialize props
  const { openForm, closeForm, borrowerID } = props;

  //initialize yup resolver props
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //initialize local variables
  const dispatch = useDispatch();
  const STAFFS = IT_STAFFS;
  const userSign = useSelector((state) => state.user_signature);
  const errorInSaving = useSelector((state) => state.isErrorSaving);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  function handleClear() {
    reset({
      received_by: '',
      item_status: '',
      item_remarks: '',
    });
    dispatch(clear_signature());
  }

  useEffect(() => {
    if (userSign) setIsSigned(true);
    else setIsSigned(false);
  }, [userSign]);

  useEffect(() => {
    if (!openForm) {
      dispatch(clear_signature());
      handleClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openForm]);

  useEffect(() => {
    if (errorInSaving === false) {
      setIsLoading(false);
      handleClear();
    } else setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorInSaving]);

  const update = (data) => {
    let updatedData = data;
    if (userSign) {
      setIsLoading(true);
      updatedData = {
        ...updatedData,
        borrowers_signature_returned: userSign,
      };
      dispatch(updateLog(borrowerID, updatedData));
      console.log(updatedData);
    }
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={openForm} onClose={closeForm}>
      <DialogTitle>
        <div>
          <Typography variant="h6" fontWeight="bold">
            RETURN ITEM
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate onSubmit={handleSubmit(update)}>
          <Grid container direction="column" spacing={1}>
            {/* SELECT RECEIVER */}
            <Grid item xs sm>
              <FormControl fullWidth required error={!!errors.received_by}>
                <InputLabel id="selected-input">Received by</InputLabel>
                <Controller
                  control={control}
                  defaultValue=""
                  name="received_by"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      value={value}
                      id="received_by"
                      label="Received by"
                    >
                      {STAFFS.map((staff) => (
                        <MenuItem key={staff} value={staff}>
                          {staff}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* SELECT STATUS */}
            <Grid item xs sm>
              <FormControl fullWidth required error={!!errors.item_status}>
                <InputLabel id="selected-input">Item Status</InputLabel>
                <Controller
                  control={control}
                  defaultValue=""
                  name="item_status"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      value={value}
                      id="item_status"
                      label="Item Status"
                    >
                      <MenuItem key="123" value="RETURNED">
                        RETURNED
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* ITEM REMARKS */}
            <Grid item xs sm>
              <Controller
                name="item_remarks"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    variant="outlined"
                    type="text"
                    label="Remarks"
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* SIGNATURE PAD */}
            <Grid item xs sm>
              <Signaturepad />
            </Grid>

            {/* BUTTONS */}
            <Grid item xs sm>
              <Button
                fullWidth
                variant="contained"
                color="info"
                type="submit"
                disabled={isLoading}
              >
                Update Log
              </Button>
              {isLoading && <ProgressButton loading={isLoading} />}
            </Grid>

            <Grid item xs sm>
              <Button
                onClick={handleClear}
                fullWidth
                variant="contained"
                color="primary"
              >
                Clear
              </Button>
            </Grid>

            <Feedback status={errorInSaving}></Feedback>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnItemForm;
