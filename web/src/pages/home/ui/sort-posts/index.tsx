import { Tab, Tabs } from '@mui/material'
import React from 'react'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppDispatch } from 'shared/api/model/hooks/hooks';
import { fetchPosts } from 'entities/post/model/post';

const SortPosts = () => {
  const dispatch = useAppDispatch();
  const [postFilter, setPostFilter] = React.useState(true);
  const [value, setValue] = React.useState('1');

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
    <Tabs value={value}
      onChange={handleChange}
      orientation="vertical"

      sx={{
        '& button:hover': { backgroundColor: '#232324', width: '100%', },
        '& button': { minHeight: 36, marginBottom: 1 },
        '& button.Mui-selected': { backgroundColor: '#232324', width: '100%', color: 'white' },
        '& button.Mui-selected.MuiSvgIcon-root': { color: 'black' },
      }}

      TabIndicatorProps={{ hidden: true }}>
      <Tab icon={<WhatshotIcon />} iconPosition="start" label="Популярное" value='1' />
      <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Свежее" value='2' />
    </Tabs>
  )
}

export default SortPosts