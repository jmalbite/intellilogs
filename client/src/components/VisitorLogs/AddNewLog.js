import React, { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.js';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  TextField,
  Grid,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';

const companies = ['INTELLICARE', 'AVEGA', 'AVENTUS', 'OTHERS'];
const areas = ['IT WORKSTATIONS', 'STOCK ROOM', 'SERVER ROOM'];

const schema = yup.object().shape({
  id_number: yup.string(),
  visitorname: yup.string().required(),
  company: yup.string().required(),
  area_to_visit: yup.string().required(),
  purpose: yup.string().required(),
  otherCompany: yup.string().required(),
});

//Add new log component
const AddNewLog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [postVisitorlog, setPostVisitorlog] = useState({
    id: '',
    name: '',
    company: '',
    area_visited: '',
    purpose: '',
    signature: '',
    time_visited: new Date(),
  });
  const userSign = useSelector((state) => state.user_signature);
  const [companySelected, setCompanySelected] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorPurpose, setErrorPurpose] = useState(false);
  const [errorArea, setErrorArea] = useState(false);
  const [isSign, setIsSigned] = useState(false);
  const [otherCom, setOtherCom] = useState(false);

  //inserting visitor signature in postVisitorLog state
  useEffect(() => {
    setPostVisitorlog({ ...postVisitorlog, signature: userSign });

    //checking if signature pad was filled checking in redux reducer
    if (userSign === '') setIsSigned(true);
    else setIsSigned(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSign]);

  //this useUffect checking the empty fields
  useEffect(() => {
    if (errors.visitorname) setErrorName(true);
    else setErrorName(false);

    if (errors.company) setErrorCompany(true);
    else setErrorCompany(false);

    if (errors.otherCompany) setOtherCom(true);
    else setOtherCom(false);

    if (errors.area_to_visit) setErrorArea(true);
    else setErrorArea(false);

    if (errors.purpose) setErrorPurpose(true);
    else setErrorPurpose(false);
  }, [
    errors.visitorname,
    errors.company,
    errors.area_to_visit,
    errors.purpose,
    errors.otherCompany,
  ]);

  //checking the company select component
  const handleChangeCompany = (e) => {
    if (e.target.value !== 'OTHERS') {
      setPostVisitorlog({ ...postVisitorlog, company: e.target.value });
      setCompanySelected(e.target.value);
    } else {
      setPostVisitorlog({ ...postVisitorlog, company: '' });
      setCompanySelected(e.target.value);
    }
  };

  //handle area component
  const handleArea = (e) => {
    setPostVisitorlog({ ...postVisitorlog, area_visited: e.target.value });
  };

  const save = () => {
    if (!isSign) {
      console.log('postlog:', postVisitorlog);
    } else console.log('signature not yet filled');
  };

  return (
    <Grid item xs>
      <form noValidate onSubmit={handleSubmit(save)}>
        <div>
          <Grid container direction="column" spacing={1}>
            <Grid item xs sm alignSelf="center">
              <Typography variant="h5" color="textPrimary">
                ADD LOG
              </Typography>
            </Grid>

            {/* ID NUMBER */}
            <Grid item xs sm>
              <TextField
                {...register('id_number')}
                autoComplete="off"
                variant="outlined"
                type="text"
                label="ID number"
                fullWidth
                onChange={(e) =>
                  setPostVisitorlog({
                    ...postVisitorlog,
                    id: e.target.value,
                  })
                }
              />
            </Grid>

            {/* NAME */}
            <Grid item xs sm>
              <TextField
                {...register('visitorname')}
                autoComplete="off"
                variant="outlined"
                type="text"
                label="Name"
                error={errorName}
                fullWidth
                onChange={(e) =>
                  setPostVisitorlog({ ...postVisitorlog, name: e.target.value })
                }
              />
            </Grid>

            {/* COMPANY */}
            <Grid item xs sm>
              <FormControl required fullWidth error={errorCompany}>
                <InputLabel id="company">Company</InputLabel>
                <Select
                  {...register('company')}
                  labelId="company"
                  id="com"
                  value={companySelected}
                  label="Company"
                  onChange={handleChangeCompany}
                  required
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* OTHERS IF COMPANY IS SELECTED AS 'OTHERS' */}
            {companySelected === 'OTHERS' ? (
              <Grid item xs sm>
                <TextField
                  {...register('company')}
                  error={otherCom}
                  required
                  name="company"
                  variant="outlined"
                  type="text"
                  fullWidth
                  label="Please input company"
                  onChange={(e) =>
                    setPostVisitorlog({
                      ...postVisitorlog,
                      company: e.target.value,
                    })
                  }
                />
              </Grid>
            ) : null}

            {/* AREA TO VISIT */}
            <Grid item xs sm>
              <FormControl fullWidth required error={errorArea}>
                <InputLabel id="area-to-visit">Area</InputLabel>
                <Select
                  {...register('area_to_visit')}
                  required
                  labelId="area"
                  id="area-to-visit"
                  value={postVisitorlog.area_visited}
                  onChange={handleArea}
                  label="Area"
                >
                  {areas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* PURPOSE */}
            <Grid item xs sm>
              <TextField
                {...register('purpose')}
                autoComplete="off"
                required
                variant="outlined"
                type="text"
                label="Purpose"
                fullWidth
                error={errorPurpose}
                onChange={(e) =>
                  setPostVisitorlog({
                    ...postVisitorlog,
                    purpose: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs sm>
              <SignaturePad />
            </Grid>

            <Grid item xs sm>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Save Log
              </Button>
            </Grid>

            <Grid item xs sm>
              <Button fullWidth variant="contained" color="primary">
                Clear
              </Button>
            </Grid>
          </Grid>
          {/* end of inside grid paper  */}
        </div>
        {/* end of paper component */}
      </form>
      {/* end of paper component */}
    </Grid>
  );
};

export default AddNewLog;
