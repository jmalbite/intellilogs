import React, { useState, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material';

const SignaturePad = () => {
  const [pad, setPad] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const sigCanvas = useRef({});

  const padOpen = () => {
    setPad(true);
  };

  const padClose = () => {
    setPad(false);
  };

  const clearPad = () => {
    sigCanvas.current.clearCanvas();
  };

  const save = () => {
    sigCanvas.current
      .exportImage('png')
      .then((data) => {
        setImageURL(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    padClose();
  };

  console.log(imageURL);

  return (
    <>
      <Button variant="outlined" onClick={padOpen}>
        Sign Here
      </Button>
      <Dialog open={pad} onClose={padClose}>
        <DialogTitle>Please sign</DialogTitle>
        <DialogContent dividers={true}>
          <div className={'signatureArea'}>
            <ReactSketchCanvas
              ref={sigCanvas}
              strokeWidth={2}
              strokeColor="red"
            />
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
