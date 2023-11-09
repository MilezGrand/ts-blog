import { SvgIcon } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
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
          borderRadius: 10,
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, .02), 0 1px 3px rgba(0, 0, 0, .14)',
          border: 'none',
        },
        outlined: {
          backgroundColor: '#2c2c2c',
          color: '#C9CCCF',

          ':hover': {
            border: 'none',
            backgroundColor: '#2c2c2c',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, .02), 0 1px 3px #2c2c2c',
          },

          ':active': {
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, .02), 0 1px 3px #2c2c2c',
          },
        },
        contained: {
          ':hover': {
            backgroundColor: '#598FDE',
          },
          ':active': {
            backgroundColor: '#3367B5',
          },
        },
      },
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
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#232324',
          backgroundImage: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: '#C9CCCF',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#C9CCCF',
          margin: '5px',
          ':hover': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          border: '1px solid #2f2f2f',
          borderRadius: 10,
          padding: '0',
        },
      },
    },
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#2c2c2d',
          color: '#c7cacd',
          borderWidth: 0,
        },
      },
    },

  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 17,
    },
    h6: {
      color: '#C9CCCF',
    },
    body1: {
      color: '#C9CCCF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1536,
    },
  },
});
