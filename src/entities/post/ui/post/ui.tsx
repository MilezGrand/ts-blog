import React from 'react';
import clsx from 'clsx';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styles from './styles.module.scss';
import { UserInfo } from '../user-info/ui';
import { PostSkeleton } from './skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { Chip, Paper } from '@mui/material';
import { useDeletePostMutation } from 'entities/post/api/api';
import PostMenu from './post-menu/ui';

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
  isLoading,
}) => {
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      deletePost(id as number);
    }
  };

  const onClickEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  return (
    <Paper className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.postHeader}>
        <UserInfo {...user} additionalText={createdAt} />
        <PostMenu onClickRemove={onClickRemove} onClickEdit={onClickEdit} isEditable={isEditable} />
      </div>

      {!isFullPost ? (
        <Link to={`/posts/${id}`}>
          <h2 className={styles.title}>{title}</h2>
          <img className={styles.image} src={imageUrl} alt={title} />
        </Link>
      ) : (
        <>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {imageUrl && (
            <img className={clsx(styles.image, { [styles.imageFull]: isFullPost })} src={imageUrl} alt={title} />
          )}
        </>
      )}

      <div className={styles.additionalInfo}>
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
      </div>
    </Paper>
  );
};
