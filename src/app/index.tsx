import React from 'react';
import Container from '@mui/material/Container';
import { Header } from '../widgets/header';
import { Routing } from '../pages';
import { fetchAuthMe } from '../entities/auth/model/auth';
import { useAppDispatch } from '../shared/api/model/hooks/hooks';
import './styles/index.scss';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: 9 }}>
        <Routing />
      </Container>
    </>
  );
}

export default App;
