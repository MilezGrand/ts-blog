import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../shared/api/model/hooks/hooks';

import styles from './styles.module.scss';

import { useAuth } from '../../../shared/api/model/hooks/useAuth';
import { IRegister, fetchRegister } from '../model/registration';
import { SnackbarAlert } from 'shared/ui/snackbar';
import axios from 'shared/lib/axios';

export const Registration: React.FC = () => {
  const { isAuth, user } = useAuth();
  const dispatch = useAppDispatch();
  const [imagePreview, setImagePreview] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = React.useState('');
  const { error } = useAppSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
      setErrorText(error as string);
    }
  }, [error]);

  const onSubmit = async (values: IRegister) => {
    const formData = new FormData();
    formData.append('image', selectedFile as File);
    const { data } = await axios.post('/upload', formData);
    setValue('avatarUrl', data.url);
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
      const file = (event.target as HTMLInputElement)?.files?.[0] as File;

      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        setSnackbarOpen(true);
        setErrorText('Неверный формат изображения');
        return;
      }
    } catch (err) {
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
          {imagePreview ? (
            <img src={imagePreview} alt="Uploaded" className={styles.avatar} />
          ) : (
            <Avatar sx={{ width: 100, height: 100 }} />
          )}
        </div>
        <input
          {...register('avatarUrl')}
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
          accept="image/png, image/jpeg"
        />

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
        <Button disabled={!isValid} type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>

      <SnackbarAlert snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} alertType="error" text={errorText} />
    </Paper>
  );
};
