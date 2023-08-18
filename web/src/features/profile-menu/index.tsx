import { IconButton, Menu, MenuItem } from '@mui/material';
import { useAppSelector } from 'shared/api/model/hooks/hooks';
import { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import PopupState from 'material-ui-popup-state';
import styles from './styles.module.scss';

interface ProfileMenuProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ setDialogOpen }) => {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const handleProfileClick = () => {
    navigate("/posts/2");
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)} >
            <img src={user?.avatarUrl ? 'http://localhost:4444' + user?.avatarUrl : '/noavatar.png'} className={styles.avatar} alt='avatar' />
          </IconButton>
          <Menu {...bindMenu(popupState)} disableScrollLock={true}>
            <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  )
}

export default ProfileMenu