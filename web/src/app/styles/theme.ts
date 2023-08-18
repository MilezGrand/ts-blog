import { TabList } from '@mui/lab';
import { Shadows, createTheme } from '@mui/material/styles';
import React from 'react';


export const theme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3375D6',
    },
    
    
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },  
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          justifyContent: 'start',
          borderRadius: 10,
          fontSize: 17,
          // color: '#00000099'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 17,
      
    },
  },
});
