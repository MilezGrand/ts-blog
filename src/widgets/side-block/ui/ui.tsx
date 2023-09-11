import React from 'react';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

export const SideBlock: React.FC<IProps> = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
