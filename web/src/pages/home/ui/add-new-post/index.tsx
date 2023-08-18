import { Button } from '@mui/material';
import { useAppSelector } from 'shared/api/model/hooks/hooks';
import React from 'react'
import { Link } from 'react-router-dom';

const AddNewPost = () => {
  const isAuth = useAppSelector((state) => state.authReducer.user);

  return (
    <>
      {isAuth && <Link to="/add-post">
        <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>Новый пост</Button>
      </Link>}
    </>
  )
}

export default AddNewPost