/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useAppDispatch } from '../../../shared/api/model/hooks/hooks';
import { Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import clsx from 'clsx';
import { SnackbarAlert } from 'shared/ui/snackbar';
import { useAddPostMutation, useGetPostQuery, useUpdatePostMutation } from 'entities/post/model/api';
import { toggleFilter } from 'entities/post/model/post';
import { markdownOptions } from '../model/options';

export const AddPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [imagePreview, setImagePreview] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [errorText, setErrorText] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control, setValue } = useForm<IAddingPost>();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const { data } = useGetPostQuery(id as string);
  const options: Options = React.useMemo(markdownOptions, []);

  React.useEffect(() => {
    if (id) {
      setImagePreview(`http://localhost:4444${data?.imageUrl}`);
      setValue('imageUrl', data?.imageUrl as string);
      setValue('text', data?.text as string);
    }
  }, [data, id, setValue]);

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

  const handleSubmitButton: SubmitHandler<IAddingPost> = async (fields: IAddingPost) => {
    try {
      if (`http://localhost:3000/${data?.imageUrl}` != imagePreview) {
        const formData = new FormData();
        formData.append('image', selectedFile as File);
        const imgResponse = (await axios.post('/upload', formData)).data.url;

        fields.imageUrl = imgResponse;
      }
      id ? await updatePost({ id, fields }).unwrap() : await addPost(fields).unwrap();

      dispatch(toggleFilter(false));
      navigate(`/`, { replace: true });
      window.scrollTo(0, 0);
    } catch (err) {
      setErrorText('Ошибка при создании статьи');
      setSnackbarOpen(true);
    }
  };

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
        {imagePreview && <img className={styles.image} src={imagePreview} alt="Uploaded" />}
        <input
          {...register('imageUrl')}
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
          accept="image/png, image/jpeg"
        />
      </Box>

      {((id && data?.title) || !id) && (
        <form onSubmit={handleSubmit(handleSubmitButton)}>
          <br />
          <br />

          <TextField
            {...register('title')}
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Заголовок статьи..."
            fullWidth
            defaultValue={id ? data?.title : ''}
          />
          <TextField
            {...register('tags')}
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Тэги"
            fullWidth
            defaultValue={id ? data?.tags : ''}
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
                  value={id ? data?.text : ''}
                />
              );
            }}
          />

          <div className={styles.buttons}>
            <Button type="submit" size="large" variant="contained">
              {id ? 'Сохранить' : 'Опубликовать'}
            </Button>
            <a href="/">
              <Button size="large">Отмена</Button>
            </a>
          </div>
        </form>
      )}

      <SnackbarAlert snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} alertType="error" text={errorText} />
    </Paper>
  );
};
