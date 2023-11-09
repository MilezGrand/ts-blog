import { Modal } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { Login } from './Login';
import { Registration } from './Registration';
import { useAuth } from 'shared/api/model/hooks/useAuth';

import styles from './styles.module.scss';

interface IProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalLogin: React.FC<IProps> = ({ modalOpen, setModalOpen }) => {
  const [register, setRegister] = React.useState(false);
  const { isAuth } = useAuth();

  React.useEffect(() => {
    if (isAuth) {
      setModalOpen(false);
    }
  }, [isAuth]);

  return (
    <Modal
      className={styles.modal}
      open={modalOpen}
      onClose={() => { setModalOpen(false); setRegister(false) }}
      sx={{ backdropFilter: 'blur(15px)' }}
    >
      {register ? <Registration setRegister={setRegister} /> : <Login setRegister={setRegister} />}
    </Modal>
  )
}