import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppDispatch } from 'shared/api/model/hooks/hooks';
import React, { Dispatch, SetStateAction } from 'react';
import { logout } from '../../../entities/auth/model/auth';

interface IProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const LogoutDialog: React.FC<IProps> = ({ dialogOpen, setDialogOpen }) => {
  const dispatch = useAppDispatch();

  const handleDialogClose = () => {
    dispatch(logout());
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} >
      <DialogTitle>Вы действительно хотите выйти?</DialogTitle>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
        <Button onClick={handleDialogClose} autoFocus>
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
};
