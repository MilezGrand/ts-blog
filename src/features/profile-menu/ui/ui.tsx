import { Fade, IconButton, Menu, MenuItem } from '@mui/material';
import { useAppSelector } from 'shared/api/model/hooks/hooks';
import { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupState from 'material-ui-popup-state';
import styles from './styles.module.scss';

interface ProfileMenuProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ setDialogOpen }) => {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const handleProfileClick = () => {
    navigate('/posts/2');
  };

  return (
    <PopupState variant="popover" popupId="post-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <img
              src={user?.avatarUrl ? 'https://milezgrand.site/api' + user?.avatarUrl : '/noavatar.png'}
              className={styles.avatar}
              alt="avatar"
            />
          </IconButton>
          <Menu
            {...bindMenu(popupState)}
            disableScrollLock={true}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleProfileClick} disabled>
              <AccountCircleRoundedIcon />
              Профиль
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppRoundedIcon />
              Выйти
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};
