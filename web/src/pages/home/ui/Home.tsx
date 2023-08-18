import React from 'react';
import Grid from '@mui/material/Grid';
import { Post } from '../../../entities/post';
import { CommentsBlock } from '../../../widgets/comments-block';
import { useAppSelector } from '../../../shared/api/model/hooks/hooks';
import SortPosts from 'pages/home/ui/sort-posts';
import AddNewPost from 'pages/home/ui/add-new-post';

export const Home: React.FC = () => {
    const { user } = useAppSelector((state) => state.authReducer);
    const { posts, loading } = useAppSelector((state) => state.postReducer);

    return (
        <>
            <Grid container spacing={1} maxWidth="xl">
                <Grid xs={2} item >
                    <SortPosts />
                    <AddNewPost />
                </Grid>

                <Grid xs={7} item >
                    {(loading ? [...Array(3)] : posts).map((obj, index) =>
                        loading ? (
                            <Post key={index}
                                isLoading={true}
                            />
                        ) : (
                            <Post
                                id={obj.id}
                                key={obj.id}
                                title={obj.title}
                                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
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
                </Grid>

                <Grid xs={3} item >
                    {/* <TagsBlock items={tags.items} isLoading={isTagsLoading} /> */}
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Что это такое?',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'Это так круто!',
                            },
                        ]}
                        isLoading={false} children={''}
                    />
                </Grid>
            </Grid>
        </>
    );
};
