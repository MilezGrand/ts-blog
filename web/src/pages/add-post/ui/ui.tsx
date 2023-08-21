import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import styles from './styles.module.scss';
import axios from '../../../shared/lib/axios';
import { useAuth } from '../../../shared/api/model/hooks/useAuth';
import { Options } from 'easymde';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IAddingPost } from '../../../entities/post/model/types';
import { fetchPost } from '../../../entities/post/model/post';
import { useAppDispatch, useAppSelector } from '../../../shared/api/model/hooks/hooks';
import { Alert, Box, Snackbar } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import clsx from 'clsx';

export const AddPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [imagePreview, setImagePreview] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { fullPost } = useAppSelector((state) => state.postReducer);
  const isEditing = Boolean(id);
  const { register, handleSubmit, control, setValue } = useForm<IAddingPost>();

  React.useEffect(() => {
    if (isEditing) {
      dispatch(fetchPost(id as unknown as number)).then(({ payload }) => {
        setImagePreview(payload.imageUrl);
        setValue('imageUrl', payload.imageUrl);
        setValue('text', payload.text);
      });
    }
  }, [dispatch, id, isEditing, setValue]);

  const handleChangeFile = async (event: React.FormEvent<HTMLInputElement>) => {
    try {
      setImagePreview('');
      setValue('imageUrl', '');
      const formData = new FormData();
      const file = (event.target as HTMLInputElement)?.files?.[0] as File;
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData);
        setValue('imageUrl', data.url);
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

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSubmitButton: SubmitHandler<IAddingPost> = async (fields) => {
    try {
      const { data } = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);

      const _id = isEditing ? id : data.id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      setErrorText('Ошибка при создании статьи');
      setSnackbarOpen(true);
    }
  };

  const options: Options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Текст статьи...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'myUniqueId',
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Box className={styles.imageContainer} onClick={() => inputFileRef?.current?.click()}>
        <AddPhotoAlternateIcon
          color="action"
          sx={{ fontSize: 80 }}
          className={clsx(styles.image, { [styles.imageUploaded]: imagePreview })}
        />
        {imagePreview && <img className={styles.image} src={`http://localhost:4444${imagePreview}`} alt="Uploaded" />}
        <input
          {...register('imageUrl')}
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
          accept="image/png, image/jpeg"
        />
      </Box>

      {((isEditing && fullPost.title) || !isEditing) && (
        <form onSubmit={handleSubmit(handleSubmitButton)}>
          <br />
          <br />

          <TextField
            {...register('title')}
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Заголовок статьи..."
            fullWidth
            defaultValue={id ? fullPost.title : ''}
          />
          <TextField
            {...register('tags')}
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Тэги"
            fullWidth
            defaultValue={id ? fullPost.tags : ''}
          />
          <Controller
            name="text"
            control={control}
            render={({ field }) => {
              return (
                <SimpleMDE
                  className={styles.editor}
                  onChange={(value) => field.onChange(value)}
                  options={options}
                  value={id ? fullPost.text : ''}
                />
              );
            }}
          />

          <div className={styles.buttons}>
            <Button type="submit" size="large" variant="contained">
              {isEditing ? 'Сохранить' : 'Опубликовать'}
            </Button>
            <a href="/">
              <Button size="large">Отмена</Button>
            </a>
          </div>
        </form>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
