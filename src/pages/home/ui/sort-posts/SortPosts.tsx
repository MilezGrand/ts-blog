import { Tab, Tabs } from '@mui/material';
import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppDispatch, useAppSelector } from 'shared/api/model/hooks/hooks';
import { toggleFilter } from 'entities/post/model/post';
import { useLocation, useNavigate } from 'react-router-dom';

const SortPosts = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('1');
  const { filter } = useAppSelector((state) => state.postReducer);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname == '/') {
      setValue(filter);
    } else {
      setValue('0');
    }
  }, [location, filter]);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    dispatch(toggleFilter(newValue));
    navigate('/')
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      sx={{
        '& button:hover': { backgroundColor: '#232324', width: '100%' },
        '& button': { minHeight: 36, marginBottom: 1 },
        '& button.Mui-selected': { backgroundColor: '#232324', width: '100%', color: 'white' },
        '& button.Mui-selected.MuiSvgIcon-root': { color: 'black' },
      }}
      TabIndicatorProps={{ hidden: true }}
    >
      <Tab icon={<WhatshotIcon />} iconPosition="start" label="Популярное" value={'1'} />
      <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Свежее" value={'2'} />
    </Tabs>
  );
};

export default SortPosts;
