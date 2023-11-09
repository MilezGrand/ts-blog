import React from 'react';
import { Post } from '../../../entities/post';
import { useAppSelector } from '../../../shared/api/model/hooks/hooks';
import { useGetAllPostsQuery } from 'entities/post/api/api';
import { IPost } from 'entities/post/model/types';

export const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { filter } = useAppSelector((state) => state.postReducer);
  const { data, isLoading } = useGetAllPostsQuery(filter);

  return (
    <>
      {(isLoading ? [...Array(3)] : data).map((obj: IPost, index: number) =>
        isLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            id={obj.id}
            key={obj.id}
            title={obj.title}
            imageUrl={obj.imageUrl ? `https://milezgrand.site/api${obj.imageUrl}` : ''}
            user={obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={3}
            tags={obj.tags}
            isEditable={user?.id === obj.user.id}
            isFullPost={false}
            isLoading={false}
          />
        ),
      )}

    </>
  );
};
