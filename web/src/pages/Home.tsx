import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { Button } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';


export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authReducer);
    const { posts, loading } = useAppSelector((state) => state.postReducer);
    const [value, setValue] = React.useState('1');
    const [postFilter, setPostFilter] = React.useState(true);
    const isAuth = useAppSelector((state) => state.authReducer.user);
    React.useEffect(() => {
        dispatch(fetchPosts(postFilter));
    }, [dispatch, postFilter]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (value === '2') {
            setPostFilter(true)
        } else {
            setPostFilter(false)
        }
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={1} maxWidth="xl">
                <Grid xs={2} item >
                    <Tabs value={value}
                        onChange={handleChange}
                        orientation="vertical"
                        
                        sx={{
                            '& button:hover': { backgroundColor: '#232324', width: '100%', },
                            '& button': { minHeight: 36, marginBottom: 1 },
                            '& button.Mui-selected': { backgroundColor: '#232324', width: '100%', color: 'white' },
                            '& button.Mui-selected.MuiSvgIcon-root': {  color: 'black' },
                        }}
                        
                        TabIndicatorProps={{ hidden: true }}>
                        <Tab icon={<WhatshotIcon />} iconPosition="start" label="Популярное" value='1' />
                        <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Свежее" value='2' />
                    </Tabs>
                    {isAuth && <Link to="/add-post">
                        <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>Новый пост</Button>
                    </Link>}
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
