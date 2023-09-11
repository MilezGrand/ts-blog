/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './styles.module.scss';
import { UserInfo } from '../user-info/ui';
import { PostSkeleton } from './skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { Chip, Paper } from '@mui/material';
import { useDeletePostMutation } from 'entities/post/api/api';

interface PostProps {
  id?: number;
  title?: string;
  text?: string;
  tags?: string[];
  viewsCount?: number;
  user?: { avatarUrl?: string; fullName?: string; email?: string; passwordHash?: string; id?: number };
  imageUrl?: string;
  commentsCount?: number;
  createdAt?: string;
  children?: React.ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
}

export const Post: React.FC<PostProps> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
}) => {
  const navigate = useNavigate();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      deletePost(id as number);
    }
  };

  return (
    <Paper className={clsx(styles.root, styles.wrapper, { [styles.rootFull]: isFullPost })}>
      {imageUrl && (
        <img className={clsx(styles.image, { [styles.imageFull]: isFullPost })} src={imageUrl} alt={title} />
      )}

      <UserInfo {...user} additionalText={createdAt} />

      <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
        {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
      </h2>

      <div>
        {tags && tags.length > 1 && (
          <ul className={styles.tags}>
            {tags?.map((name) => (
              <li key={name}>
                <Chip
                  label={`#${name}`}
                  variant="outlined"
                  onClick={() => {
                    navigate(`/tag/${name}`);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
        {children && <div className={styles.content}>{children}</div>}
      </div>

      {isEditable && (
        <Paper className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="error">
            <DeleteIcon />
          </IconButton>
        </Paper>
      )}

      <ul className={styles.postDetails}>
        <li>
          <EyeIcon />
          <span>{viewsCount}</span>
        </li>
        <li>
          <CommentIcon />
          <span>{commentsCount}</span>
        </li>
      </ul>
    </Paper>
  );
};
