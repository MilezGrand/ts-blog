import React, { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import styles from './styles.module.scss';
import Container from '@mui/material/Container';
import { useAppSelector } from '../../../../shared/api/model/hooks/hooks';
import { AppBar, Box} from '@mui/material';
import { ProfileMenu } from 'features/profile-menu';
import { LogoutDialog } from 'features/logout-dialog';
import Logo from './Logo';

interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: React.FC<IProps> = ({ setModalOpen }) => {
  const isAuth = useAppSelector((state) => state.authReducer.user);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <Box>
        <AppBar
          component="nav"
          sx={{
            height: '60px',
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
                    <Button variant="outlined" onClick={() => setModalOpen(true)}>Войти</Button>
                  </>
                )}
              </div>
            </div>
          </Container>
        </AppBar>
      </Box>

      <LogoutDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
};