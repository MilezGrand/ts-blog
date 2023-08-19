import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import React from 'react';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link className={styles.logo} to="/">
      <Typography variant="h4" fontWeight={700}>
        GABR
      </Typography>
    </Link>
  );
};

export default Logo;
