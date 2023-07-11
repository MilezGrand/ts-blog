import React from 'react';
import Button from '@mui/material/Button';
import { logout } from '../../redux/slices/auth';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const isAuth = useAppSelector((state) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.authReducer);

    const handleLogout = () => {
        setDialogOpen(true);

    };

    const handleDialogClose = () => {
        dispatch(logout());
        setDialogOpen(false);
    }

    const handleProfileClick = () => {
        navigate("/posts/2");
    }

    return (
        <Paper className={styles.root} sx={{ borderRadius: 0, backgroundColor: '#26282B' }}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/" >
                        <Typography variant='h4' fontWeight={700} >GABR</Typography>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <IconButton {...bindTrigger(popupState)} >
                                                <img src={user?.avatarUrl ? 'http://localhost:4444' + user?.avatarUrl : '/noavatar.png'} className={styles.avatar} alt='avatar' />
                                            </IconButton>
                                            <Menu {...bindMenu(popupState)} disableScrollLock={true}>
                                                <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
                                                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
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
                open={dialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Вы действительно хотите выйти?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
                    <Button onClick={handleDialogClose} autoFocus>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};
