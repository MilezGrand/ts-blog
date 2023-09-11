import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../shared/api/model/hooks/hooks';

import { useAuth } from '../../../shared/api/model/hooks/useAuth';
import React from 'react';
import { ILogin, fetchLogin } from '../model/login';
import { SnackbarAlert } from 'shared/ui/snackbar';

export const Login: React.FC = () => {
  const { isAuth, user } = useAuth();
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const { error } = useAppSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
      setErrorText(error as string);
    }
  }, [error]);

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
        <Button disabled={!isValid} type="submit" variant="contained" fullWidth>
          Войти
        </Button>
      </form>

      <SnackbarAlert snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} alertType="error" text={errorText} />
    </Paper>
  );
};
