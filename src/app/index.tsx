import React from 'react';
import Container from '@mui/material/Container';
import { Header } from '../widgets/header';
import { Routing } from '../pages';
import { fetchAuthMe } from '../entities/auth/model/auth';
import { useAppDispatch } from '../shared/api/model/hooks/hooks';
import './styles/index.scss';
import SortPosts from 'pages/home/ui/sort-posts/SortPosts';
import AddNewPost from 'pages/home/ui/add-new-post/AddNewPost';
import { CommentsBlock } from 'widgets/comments-block';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ModalLogin } from 'widgets/modal-login';

function App() {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header setModalOpen={setModalOpen} />
      <Container maxWidth="lg" sx={{ paddingTop: 9 }} >
        <Grid2 container flexDirection={'row'} spacing={2} >
          <Grid2 xs={2} >
            <SortPosts />
            <AddNewPost setModalOpen={setModalOpen}/>
          </Grid2>

          <Grid2 xs={7} >
            <Routing />
          </Grid2>

          <Grid2 xs>

            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Что это такое?',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'Это так круто!',
                },
              ]}
              isLoading={false}
            />
          </Grid2>
        </Grid2>
      </Container>

      <ModalLogin modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default App;
