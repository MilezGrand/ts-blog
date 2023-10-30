import { Fade, IconButton, Menu, MenuItem } from '@mui/material';
import PopupState from 'material-ui-popup-state';
import React from 'react';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { bindTrigger, bindMenu } from 'material-ui-popup-state';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

interface PostMenuProps {
  onClickEdit: () => void;
  onClickRemove: () => void;
  isEditable: boolean | undefined;
}

const PostMenu: React.FC<PostMenuProps> = ({ onClickEdit, onClickRemove, isEditable }) => {
  return (
    <PopupState variant="popover" popupId="profile-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <MoreHorizRoundedIcon />
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
            {isEditable ? (
              <>
                <MenuItem onClick={onClickEdit}>
                  <EditIcon />
                  Редактировать
                </MenuItem>
                <MenuItem onClick={onClickRemove}>
                  <DeleteIcon />
                  Удалить
                </MenuItem>
              </>
            ) : (
              <MenuItem disabled={true}>
                <FlagRoundedIcon />
                Пожаловаться
              </MenuItem>
            )}
          </Menu>
        </>
      )}
    </PopupState>
  );
};

export default PostMenu;
