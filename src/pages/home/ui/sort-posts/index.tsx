import { Tab, Tabs } from '@mui/material';
import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppDispatch, useAppSelector } from 'shared/api/model/hooks/hooks';
import { toggleFilter } from 'entities/post/model/post';

const SortPosts = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(true);
  const { filter } = useAppSelector((state) => state.postReducer);

  React.useEffect(() => {
    setValue(filter);
  }, [filter]);

  const handleChange = () => {
    dispatch(toggleFilter(!filter));
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
      <Tab icon={<WhatshotIcon />} iconPosition="start" label="Популярное" value={true} />
      <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Свежее" value={false} />
    </Tabs>
  );
};

export default SortPosts;
