import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'shared/api/model/hooks/hooks';

interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
const AddNewPost: React.FC<IProps> = ({ setModalOpen }) => {
  const isAuth = useAppSelector((state) => state.authReducer.user);
  const navigate = useNavigate();

  const handleClick = () => {
    isAuth ? navigate('/add-post') : setModalOpen(true)
  }

  return (
    <>
      <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={handleClick}>
        Новый пост
      </Button>
    </>

  );
};

export default AddNewPost;
