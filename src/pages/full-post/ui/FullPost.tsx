import React from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../../entities/post';
import { AddComment } from '../../../entities/comment';
import { CommentsBlock } from '../../../widgets/comments-block';
import ReactMarkdown from 'react-markdown';
import { useAppDispatch, useAppSelector } from '../../../shared/api/model/hooks/hooks';
import { useGetPostQuery } from 'entities/post/api/api';
import { toggleFilter } from 'entities/post/model/post';


export const FullPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery(id as string);
  const { loading } = useAppSelector((state) => state.postReducer);

  React.useEffect(() => {
    window.scrollTo(0,0);
    // dispatch(toggleFilter(0))
  }, []);

  if (loading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data?.id}
        title={data?.title}
        imageUrl={data?.imageUrl ? `https://milezgrand.site/api${data?.imageUrl}` : ''}
        user={data?.user}
        createdAt={data?.createdAt}
        viewsCount={data?.viewsCount}
        commentsCount={3}
        tags={data?.tags}
        isFullPost={true}
        isLoading={isLoading}
        isEditable={false}
      >
        {data && <ReactMarkdown>{data?.text}</ReactMarkdown>}
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
