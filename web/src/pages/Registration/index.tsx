import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { fetchRegister } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './Login.module.scss';
import {  IRegister } from '../../interfaces/auth';
import { useAuth } from '../../hooks/useAuth';

export const Registration: React.FC = () => {
    const {isAuth, user} = useAuth();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: 'Иван Иванов',
            email: 'ivan@mail.ru',
            password: '12345',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: IRegister) => {
        await dispatch(fetchRegister(values));
    };

    if (isAuth) {
        if (user!.token) {
            window.localStorage.setItem('token', user!.token);
        }
        return <Navigate to="/" />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.avatar}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    fullWidth
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Укажите имя' })}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Укажите почту' })}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                    type="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Укажите пароль' })}
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
