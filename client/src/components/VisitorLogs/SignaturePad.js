import React, { useState, useRef, useLayoutEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useDispatch } from 'react-redux';

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { user_signature } from '../../actions/visitor_action';

const SignaturePad = () => {
  const [pad, setPad] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const sigCanvas = useRef({});
  const dispatch = useDispatch();

  const padOpen = () => setPad(true);
  const padClose = () => setPad(false);

  const clearPad = () => {
    sigCanvas.current.clear();
    setImageURL('');
  };

  const save = () => {
    if (!sigCanvas.current.isEmpty()) {
      setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
      padClose();
    } else console.log('please sign first');
  };

  useLayoutEffect(() => {
    if (imageURL) dispatch(user_signature(imageURL));
  }, [dispatch, imageURL]);

  return (
    <>
      <Button variant="outlined" onClick={padOpen}>
        Sign Here
      </Button>
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
