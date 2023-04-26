import React from 'react';
import Button from '@mui/material/Button';
import { logout } from '../../redux/slices/auth';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const Header: React.FC = () => {
    const isAuth = useAppSelector((state) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);

    const handleLogout = () => {
        setOpen(true)
    };

    const handleClose = () => {
        dispatch(logout());
        setOpen(false)
    }
    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>GABR</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/add-post">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                    <Button onClick={handleLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
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

            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Вы действительно хотите выйти?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                    <Button onClick={handleClose} autoFocus>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
