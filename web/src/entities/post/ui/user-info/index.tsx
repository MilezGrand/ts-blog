import React from 'react';
import styles from './UserInfo.module.scss';

interface userInfoProps {
  avatarUrl?: string;
  fullName?: string;
  additionalText?: string;
}

export const UserInfo: React.FC<userInfoProps> = ({ avatarUrl, fullName, additionalText }) => {
  const date = new Date(additionalText as string);
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl ? 'http://localhost:4444' + avatarUrl : '/noavatar.png'}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>
          {date.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};
