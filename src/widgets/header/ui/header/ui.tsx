/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Button from '@mui/material/Button';
import styles from './styles.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../shared/api/model/hooks/hooks';
import { AppBar, Box, Paper, Typography } from '@mui/material';
import { ProfileMenu } from 'features/profile-menu';
import { LogoutDialog } from 'features/logout-dialog';
import Logo from '../logo';

export const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.authReducer.user);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Box>
      <AppBar
        component="nav"
        sx={{
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#26282B',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <div className={styles.inner}>
            <Logo />
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <ProfileMenu setDialogOpen={setDialogOpen} />
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
        <LogoutDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </AppBar>
    </Box>
  );
};
