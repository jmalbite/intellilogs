import React, { useState, useEffect } from 'react';
import { IT_STAFFS } from '../Constant';
import SignaturePad from '../layout/Signaturepad';
import Feedback from '../Response components/Feedback';
import ProgressButton from '../Response components/ProgressButton';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { clear_signature } from '../../actions/global_action';
import {
  Grid,
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { storeBorrowersLog } from '../../actions/borrowers_action';

const schema = yup.object().shape({
  company: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  item_borrowed: yup.string().required(),
  handed_by: yup.string().required(),
});

const OutsiderFormBorrowers = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const userSign = useSelector((state) => state.user_signature);
  const errorInSaving = useSelector((state) => state.isErrorSaving);
  const IT_supports = IT_STAFFS;
  const dispatch = useDispatch();
  const [isSign, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //checking if signature pad was filled - checking in redux reducer
    if (userSign === '') setIsSigned(false);
    else setIsSigned(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  useEffect(() => {
    if (errorInSaving === false) {
      setIsLoading(false);

      //call clear function when no error in saving log
      handleClear();
    } else setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorInSaving]);

  function handleClear() {
    reset({
      company: '',
      firstname: '',
      lastname: '',
      item_borrowed: '',
      handed_by: '',
    });
    dispatch(clear_signature());
  }

  const save = (data) => {
    let borrowersData = data;

    if (isSign) {
      setIsLoading(true);
      borrowersData = {
        ...borrowersData,
        borrowers_id: uuidv4(),
        employee_code: 'N/A',
        date_time_borrowed: new Date(),
        borrowers_signature: userSign,
        item_status: 'BORROWED',
      };

      dispatch(storeBorrowersLog(borrowersData));
    } else {
      console.log('signature not yet filled');
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(save)}>
        <Grid container direction="column" spacing={1}>
          {/* COMPANY */}
          <Grid item xs sm>
            <Controller
              name="company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  type="text"
                  label="Company"
                  error={!!errors.company}
                  required
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* BORROWERS FIRSTNAME */}
          <Grid item xs sm>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  required
                  variant="outlined"
                  type="text"
                  label="Firstname"
                  error={!!errors.firstname}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* BORROWERS LASTNAME */}
          <Grid item xs sm>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  required
                  variant="outlined"
                  type="text"
                  label="Lastname"
                  error={!!errors.lastname}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* ITEM TO BE BORRWED */}
          <Grid item xs sm>
            <Controller
              name="item_borrowed"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  required
                  variant="outlined"
                  type="text"
                  label="Item"
                  error={!!errors.item_borrowed}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* HANDED BY */}
          <Grid item xs sm>
            <FormControl fullWidth required error={!!errors.handed_by}>
              <InputLabel id="selected-input">Handed By</InputLabel>
              <Controller
                control={control}
                defaultValue=""
                name="handed_by"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    id="select-it_support"
                    label="Handed By"
                  >
                    {IT_supports.map((it_support) => (
                      <MenuItem key={it_support} value={it_support}>
                        {it_support}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* SIGNATURE PAD */}
          <Grid item xs sm>
            <SignaturePad />
          </Grid>

          {/* BUTTONS */}
          <Grid item xs sm>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isLoading}
            >
              Save Log
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

          <Grid item xs sm>
            <Feedback status={errorInSaving} />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default OutsiderFormBorrowers;
