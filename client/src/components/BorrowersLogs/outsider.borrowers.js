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
import { clear_signature, storeNewLog } from '../../actions/visitor_action.js';
import {
  Grid,
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';

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
    if (userSign === '') setIsSigned(true);
    else setIsSigned(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  useEffect(() => {
    if (errorInSaving === false) {
      setIsLoading(false);
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
};

export default OutsiderFormBorrowers;
