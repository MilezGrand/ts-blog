import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import styles from '../styles.module.scss';

export const PostSkeleton: React.FC<{ isFullPost?: boolean }> = ({ isFullPost }) => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonUser}>
            <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 10 }} />
            <div className={styles.skeletonUserDetails}>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </div>
          </div>
        </div>

        <div className={styles.skeletonContent} style={{ paddingTop: 0 }}>
          <Skeleton variant="text" width="80%" height={45} />
        </div>

        <Skeleton variant="rectangular" width="100%" height={500} />

        <div className={styles.skeletonContent}>
          <div className={styles.skeletonTags}>
            <Skeleton variant="text" width={40} height={30} />
            <Skeleton variant="text" width={40} height={30} />
            <Skeleton variant="text" width={40} height={30} />
          </div>
        </div>

        {isFullPost && (<div className={styles.skeletonContent} style={{ paddingTop: 0 }}>
          <Skeleton variant="text" width="80%" height={35} />
          <Skeleton variant="text" width="50%" height={35} />
          <Skeleton variant="text" width="100%" height={35} />
          <Skeleton variant="text" width="90%" height={35} />
          <Skeleton variant="text" width="70%" height={35} />
          <Skeleton variant="text" width="80%" height={35} />
          <Skeleton variant="text" width="50%" height={35} />
          <Skeleton variant="text" width="100%" height={35} />
          <Skeleton variant="text" width="90%" height={35} />
          <Skeleton variant="text" width="70%" height={35} />
        </div>)}
      </Stack>
    </div>
  );
};
