import React from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../../entities/post';
import { AddComment } from '../../../entities/comment';
import { CommentsBlock } from '../../../widgets/comments-block';
import ReactMarkdown from 'react-markdown';
import { useAppDispatch, useAppSelector } from '../../../shared/api/model/hooks/hooks';
import { fetchPost } from '../../../entities/post/model/post';

export const FullPost: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { fullPost, loading } = useAppSelector((state) => state.postReducer);

  React.useEffect(() => {
    dispatch(fetchPost(id as unknown as number));
  }, [dispatch, id]);

  if (loading) {
    return <Post isLoading={loading} isFullPost />;
  }

  return (
    <>
      <Post
        id={fullPost.id}
        title={fullPost.title}
        imageUrl={fullPost.imageUrl ? `http://localhost:4444${fullPost.imageUrl}` : ''}
        user={fullPost.user}
        createdAt={fullPost.createdAt}
        viewsCount={fullPost.viewsCount}
        commentsCount={3}
        tags={fullPost.tags}
        isFullPost={true}
        isLoading={loading}
        isEditable={false}
      >
        <ReactMarkdown>{fullPost.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
