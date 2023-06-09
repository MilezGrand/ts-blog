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
import axios from '../../axios';

import styles from './Login.module.scss';
import { IRegister } from '../../interfaces/auth';
import { useAuth } from '../../hooks/useAuth';
import { Alert, Snackbar } from '@mui/material';

export const Registration: React.FC = () => {
    const { isAuth, user } = useAuth();
    const dispatch = useAppDispatch();
    const [imagePreview, setImagePreview] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');
    const inputFileRef = React.useRef<HTMLInputElement>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: 'Иван Иванов',
            email: 'ivan@mail.ru',
            password: '12345',
            avatarUrl: ''
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

    const handleChangeFile = async (event: React.FormEvent<HTMLInputElement>) => {
        try {
            setImagePreview('');
            setValue('avatarUrl', '')
            const formData = new FormData();
            const file = (event.target as HTMLInputElement)?.files?.[0] as File;
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                formData.append('image', file);
                const { data } = await axios.post('/upload', formData);
                setValue('avatarUrl', data.url)
                setImagePreview(data.url);
            } else {
                setSnackbarOpen(true);
                setErrorText('Ошибка при загрузке файла');
                return;
            }
        } catch (err) {
            console.warn(err);
            setErrorText('Ошибка при загрузке файла');
            setSnackbarOpen(true);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.avatar} onClick={() => inputFileRef?.current?.click()}>
                {(imagePreview) ? (
                    <img src={`http://localhost:4444${imagePreview}`} alt="Uploaded" className={styles.avatar} />
                ) : 
                    <Avatar sx={{ width: 100, height: 100 }} />
                }
                </div>
                <input {...register('avatarUrl')} ref={inputFileRef} type="file" onChange={handleChangeFile} hidden accept="image/png, image/jpeg" />

                <TextField
                    className={styles.field}
                    label="Имя"
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
                    variant="contained"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorText}
                </Alert>
            </Snackbar>
        </Paper>
    );
};
