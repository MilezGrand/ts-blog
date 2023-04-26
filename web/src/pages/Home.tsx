import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { TabContext, TabList, TabPanel } from '@mui/lab';
export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authReducer);
    const { posts, loading } = useAppSelector((state) => state.postReducer);
    const [value, setValue] = React.useState('1');
    const [postFilter, setPostFilter] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchPosts(postFilter));
    }, [dispatch, postFilter]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (value === '1') {
            setPostFilter(true)
        } else {
            setPostFilter(false)
        }
        setValue(newValue);
    };


    return (
        <>
            <TabContext value={value}>
                <TabList onChange={handleChange} style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                    <Tab label="Новые" value='1' />
                    <Tab label="Популярные" value='2' />
                </TabList >
            </TabContext>

            <Grid container spacing={4}>
                <Grid xs={8} item>

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
                <Grid xs={4} item>
                    {/* <TagsBlock items={tags.items} isLoading={isTagsLoading} /> */}
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false} children={''}
                    />
                </Grid>
            </Grid>
        </>
    );
};
