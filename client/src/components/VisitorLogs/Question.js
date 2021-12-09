import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InternalOrOutsider } from '../../actions/visitor_action';
import {
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

const Question = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (question !== '') dispatch(InternalOrOutsider(question));
  }, [question, dispatch]);

  const AnswerYes = (e) => {
    setQuestion(e.target.value);
  };

  const AnswerNo = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <Grid item xs sm alignSelf="center">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Are you a Intellicare/Avega employee?
          </FormLabel>
          <Grid container justifyContent="center">
            <RadioGroup row name="row-radio-buttons-group">
              <Grid item xs sm>
                <FormControlLabel
                  value="YES"
                  control={<Radio />}
                  onChange={AnswerYes}
                  label="YES"
                />
              </Grid>
              <Grid item xs sm>
                <FormControlLabel
                  value="NO"
                  onChange={AnswerNo}
                  control={<Radio />}
                  label="NO"
                />
              </Grid>
            </RadioGroup>
          </Grid>
        </FormControl>
      </Grid>
    </>
  );
};

export default Question;
