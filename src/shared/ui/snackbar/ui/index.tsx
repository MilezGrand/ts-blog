import React, { Dispatch, SetStateAction } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface IProps {
  snackbarOpen: boolean;
  alertType: 'error' | 'success' | 'info' | 'warning';
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
}

export const SnackbarAlert: React.FC<IProps> = ({ snackbarOpen, setSnackbarOpen, alertType, text }) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      setSnackbarOpen(false);
    }

    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose} message={text}>
      <Alert severity={alertType}>{text}</Alert>
    </Snackbar>
  );
};
