import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useDispatch } from 'react-redux';

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { user_signature, clear_signature } from '../../actions/visitor_action';

const SignaturePad = ({ signer }) => {
  const [pad, setPad] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const sigCanvas = useRef({});
  //const userSign = useSelector((state) => state.user_signature);
  const dispatch = useDispatch();

  const padOpen = () => setPad(true);
  const padClose = () => {
    setPad(false);
    dispatch(clear_signature());
  };

  const clearPad = () => {
    sigCanvas.current.clear();
    dispatch(clear_signature());
    setImageURL('');
  };

  const save = () => {
    if (!sigCanvas.current.isEmpty()) {
      setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
      setPad(false);
    } else console.log('please sign first');
  };

  useEffect(() => {
    if (imageURL) dispatch(user_signature(imageURL));
  }, [dispatch, imageURL]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          <Button variant="outlined" onClick={padOpen}>
            Sign Here
          </Button>
        </Grid>
        <Grid item paddingLeft="15px">
          {signer === true ? (
            <Typography color="red" variant="body1">
              *signature is required
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      <Dialog open={pad} onClose={padClose}>
        <DialogTitle>Please sign</DialogTitle>
        <DialogContent dividers={true}>
          <div className={'signatureArea'}>
            <SignatureCanvas ref={sigCanvas} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={save}>
            Save
          </Button>
          <Button variant="contained" color="primary" onClick={clearPad}>
            Clear
          </Button>
          <Button variant="outlined" onClick={padClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignaturePad;
