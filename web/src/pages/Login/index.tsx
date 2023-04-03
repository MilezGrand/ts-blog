import { fetchLogin } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { ILogin } from '../../interfaces/auth';
import { useAuth } from '../../hooks/useAuth';

export const Login: React.FC = () => {
    const {isAuth, user} = useAuth();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: 'test@test.ru',
            password: '123456',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: ILogin) => {
        await dispatch(fetchLogin(values));
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
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    type="email"
                    {...register('email', { required: 'Укажите почту' })}
                    fullWidth
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
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
